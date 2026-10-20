-- Pre-Consensus dataset schema (SQLite).
--
-- The CSV files beside this one are the source of truth; tools/build_sqlite.py
-- loads them into this schema and fails on any broken key, so a typo in a hub
-- or backer id is caught before it reaches the dashboard.
--
-- Money is USD. Valuations in billions, round sizes in millions - the units the
-- research was reported in. Booleans are 0/1. Empty string in the CSV = NULL.

PRAGMA foreign_keys = ON;

CREATE TABLE regions (
  id    TEXT PRIMARY KEY,
  name  TEXT NOT NULL,
  hue   TEXT NOT NULL                -- display colour
);

CREATE TABLE hubs (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  lon        REAL NOT NULL,
  lat        REAL NOT NULL,
  region_id  TEXT NOT NULL REFERENCES regions(id)
);

CREATE TABLE themes (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  hue           TEXT NOT NULL,
  public_proxy  INTEGER NOT NULL CHECK (public_proxy IN (0,1)),  -- a listed pure-play exists
  blurb         TEXT NOT NULL
);

-- Anyone whose positions are tracked: people who build, people who allocate,
-- and institutions. Conviction counts distinct backers, never dollars.
CREATE TABLE backers (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  kind       TEXT NOT NULL CHECK (kind IN ('builder','allocator','fund')),
  role       TEXT NOT NULL,          -- their day job, as displayed
  region_id  TEXT NOT NULL REFERENCES regions(id),
  vehicle    TEXT,                   -- how they invest
  thesis     TEXT
);

CREATE TABLE ventures (
  id                  TEXT PRIMARY KEY,
  name                TEXT NOT NULL,
  theme_id            TEXT NOT NULL REFERENCES themes(id),
  hub_id              TEXT REFERENCES hubs(id),       -- operational base; NULL = not disclosed
  domicile            TEXT,                           -- legal domicile where it differs from hub
  stage               TEXT NOT NULL,                  -- label as reported
  maturity            INTEGER NOT NULL CHECK (maturity BETWEEN 1 AND 7),  -- 1 pre-seed .. 7 pre-IPO
  valuation_usd_b     REAL,                           -- last known post-money; 0 = undisclosed / no equity price
  valuation_reported  INTEGER NOT NULL CHECK (valuation_reported IN (0,1)),  -- reported, not closed
  crossover           INTEGER NOT NULL CHECK (crossover IN (0,1)),  -- crossover or sovereign on the cap table
  listed              INTEGER NOT NULL CHECK (listed IN (0,1)),
  confidence          TEXT CHECK (confidence IN ('high','med','low')),  -- in the VALUATION, not the company
  entity_type         TEXT CHECK (entity_type IN ('state','self','spac')),  -- not an ordinary priced round
  state_capital       INTEGER NOT NULL CHECK (state_capital IN (0,1)),
  raise_usd_m         REAL,                           -- size of the round that put it on the board
  university          TEXT,                           -- university or lab origin
  "grant"             INTEGER NOT NULL CHECK ("grant" IN (0,1)),  -- public grant alongside the round
  tagline             TEXT NOT NULL,
  what                TEXT,
  why                 TEXT,
  other_backers       TEXT,                           -- untracked co-investors, free text
  last_round          TEXT,
  caveat              TEXT,                           -- must travel with the valuation
  layer               TEXT NOT NULL CHECK (layer IN ('headline','seedling','regional','seed_round'))
);

-- Who backs what, and how. A row with disclosed_stake = 0 records a role
-- (e.g. a chair) without a disclosed equity position.
CREATE TABLE positions (
  venture_id       TEXT NOT NULL REFERENCES ventures(id),
  backer_id        TEXT NOT NULL REFERENCES backers(id),
  disclosed_stake  INTEGER NOT NULL CHECK (disclosed_stake IN (0,1)),
  built            INTEGER NOT NULL CHECK (built IN (0,1)),   -- founded it or personally runs it
  role             TEXT CHECK (role IN ('ceo','founder','chair','board','advisor','capital')),
  role_past        INTEGER NOT NULL CHECK (role_past IN (0,1)),  -- since relinquished
  PRIMARY KEY (venture_id, backer_id)
);

-- Disclosed funding rounds. Dates are decimal years (2026.42 = early June 2026),
-- which is the precision the reporting supports.
CREATE TABLE rounds (
  venture_id    TEXT NOT NULL REFERENCES ventures(id),
  year_frac     REAL NOT NULL,
  amount_usd_m  REAL NOT NULL CHECK (amount_usd_m >= 0),
  PRIMARY KEY (venture_id, year_frac)
);

CREATE INDEX positions_by_backer ON positions(backer_id);
CREATE INDEX ventures_by_theme   ON ventures(theme_id);

-- ---------------------------------------------------------------------------
-- Views: the questions people actually ask of this data.

-- Rounds with a readable month and the theme attached.
CREATE VIEW rounds_dated AS
SELECT r.venture_id, v.name AS venture, v.theme_id, t.name AS theme,
       r.year_frac,
       CAST(r.year_frac AS INTEGER) || '-' ||
         printf('%02d', MIN(12, CAST((r.year_frac - CAST(r.year_frac AS INTEGER)) * 12 AS INTEGER) + 1)) AS month,
       r.amount_usd_m
FROM rounds r JOIN ventures v ON v.id = r.venture_id JOIN themes t ON t.id = v.theme_id;

-- Conviction: independent backers per theme, split by kind. Not dollars.
CREATE VIEW theme_conviction AS
SELECT t.id AS theme_id, t.name AS theme,
       COUNT(DISTINCT p.backer_id) AS backers,
       COUNT(DISTINCT CASE WHEN b.kind = 'builder'   THEN p.backer_id END) AS builders,
       COUNT(DISTINCT CASE WHEN b.kind = 'allocator' THEN p.backer_id END) AS allocators,
       COUNT(DISTINCT CASE WHEN b.kind = 'fund'      THEN p.backer_id END) AS funds,
       (SELECT COUNT(*) FROM ventures v2 WHERE v2.theme_id = t.id) AS ventures
FROM themes t
LEFT JOIN ventures v  ON v.theme_id = t.id
LEFT JOIN positions p ON p.venture_id = v.id AND p.disclosed_stake = 1
LEFT JOIN backers b   ON b.id = p.backer_id
GROUP BY t.id
ORDER BY backers DESC;

-- Momentum: disclosed capital per theme per calendar year.
CREATE VIEW theme_capital_by_year AS
SELECT v.theme_id, CAST(r.year_frac AS INTEGER) AS year,
       COUNT(*) AS rounds, ROUND(SUM(r.amount_usd_m), 1) AS capital_usd_m
FROM rounds r JOIN ventures v ON v.id = r.venture_id
GROUP BY v.theme_id, year
ORDER BY v.theme_id, year;

-- Where a person spends their time, not just their money.
CREATE VIEW operator_involvement AS
SELECT b.name AS backer, b.kind, v.name AS venture, v.theme_id,
       COALESCE(p.role, 'capital') || CASE WHEN p.role_past = 1 THEN ' (past)' ELSE '' END AS role,
       p.built
FROM positions p JOIN backers b ON b.id = p.backer_id JOIN ventures v ON v.id = p.venture_id
ORDER BY b.name, v.name;
