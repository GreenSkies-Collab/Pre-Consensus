# Pre-Consensus dataset

Seven relational tables, stored as CSV. They are the single source of truth.
The dashboard and the SQLite file are both built from them.

```
regions ─< hubs ─< ventures >─ themes
   │                  │
   └──< backers ─< positions >┘
                      ventures ─< rounds
```

| Table | Rows | One row is |
|---|---|---|
| [`themes.csv`](themes.csv) | 16 | a thesis about the future (Energy & Fusion, World Models…) |
| [`regions.csv`](regions.csv) | 8 | a macro-region |
| [`hubs.csv`](hubs.csv) | 94 | a city or cluster, with coordinates |
| [`backers.csv`](backers.csv) | 78 | a person or institution whose positions are tracked |
| [`ventures.csv`](ventures.csv) | 524 | a private company |
| [`positions.csv`](positions.csv) | 486 | a backer's link to a venture, and their role in it |
| [`rounds.csv`](rounds.csv) | 203 | a dated, disclosed funding round |

Snapshot researched **4–8 August 2026** from public reporting. The full schema,
with constraints and four ready-made views, is in [`schema.sql`](schema.sql).

---

## Querying it

Every push builds `pre-consensus.sqlite`. Download it from the latest workflow
run's artifacts, or build it locally with Python and nothing else installed:

```sh
python tools/build_sqlite.py          # -> build/pre-consensus.sqlite
sqlite3 build/pre-consensus.sqlite
```

```sql
-- Which themes do the most independent backers hold? (conviction, not dollars)
SELECT theme, backers, builders, funds FROM theme_conviction;

-- Robotics capital by year
SELECT * FROM theme_capital_by_year WHERE theme_id = 'robotics';

-- Every $1B+ round in 2026
SELECT month, venture, theme, amount_usd_m FROM rounds_dated
WHERE amount_usd_m >= 1000 AND year_frac >= 2026 ORDER BY year_frac DESC;

-- Founders who personally run a company they also back
SELECT backer, venture, role FROM operator_involvement WHERE role IN ('ceo','founder');

-- Valuations to read with care
SELECT name, valuation_usd_b, caveat FROM ventures WHERE confidence = 'low' AND valuation_usd_b > 0;
```

The build also fails on any broken reference. A venture pointing at a hub
that doesn't exist, a position naming an unknown backer, or a maturity outside
1–7 stops CI before it can reach the page.

---

## Columns that need explaining

**ventures**

| Column | Meaning |
|---|---|
| `maturity` | 1 = pre-seed/seed … 7 = pre-IPO / tender. As reported. The dashboard re-derives it from round size and price for seed-round rows, because a "seed" label now spans $1M to $1B. |
| `valuation_usd_b` | Last known post-money, $B. **0 means undisclosed** (or, for a handful of headline rows, no equity price, e.g. a non-profit). 371 ventures are undisclosed. That is a fact about them, not a gap in the research. |
| `valuation_reported` | 1 = reported or in negotiation, not a closed round. |
| `confidence` | `high` / `med` / `low`: confidence in the **valuation**, not in the company. Blank on headline rows researched before grading was introduced. |
| `entity_type` | `state` / `self` / `spac`: the figure is **not** a priced venture round. Never compare these with venture valuations. |
| `state_capital` | Sovereign or state money on the cap table. |
| `hub_id` vs `domicile` | `hub_id` is where it operates. `domicile` is legal incorporation where that differs (a Delaware flip, a UK holding company). |
| `raise_usd_m` | Size of the round that put a seed-round row on the board. |
| `caveat` | A note that must travel with the valuation. The dashboard shows it in a warning box. |
| `what`, `why` | Hand-written for headline rows. Blank elsewhere; the dashboard composes them from `tagline` and `caveat`. |
| `layer` | Which research pass the row came from: `headline` (hand-profiled, with dated rounds), `seedling` (from fund portfolio pages), `regional` (the eight-region research), `seed_round` (verified pre-seed and seed rounds). |

**positions**

| Column | Meaning |
|---|---|
| `disclosed_stake` | 1 = the backer has a disclosed position. 0 = a role is known but no stake is (one row: a chair). |
| `built` | The backer founded or personally runs the company. |
| `role` | `ceo` · `founder` · `chair` · `board` · `advisor`. Blank means only capital was found. That says **"not found", not "none exists"**: role data is much sparser than funding data. |
| `role_past` | The role has since been relinquished. Scoring halves its weight. |

**rounds**

| Column | Meaning |
|---|---|
| `year_frac` | Decimal year (2026.42 is early June 2026). This is the precision the reporting supports. |
| `amount_usd_m` | Round size, $M. |

Only headline ventures carry dated rounds (91 of 524). Momentum figures
therefore describe the larger, better-reported end of each theme.

---

## Known limits

- **Survivorship bias.** VC portfolio pages drop failures, and nothing here measures how many.
- **Absence means "not found".** The data favours backers who talk publicly.
- **Regions disclose differently.** Comparing dollar totals across regions measures disclosure practice as much as activity.
- **Three duplicates were merged** in the move to this format: Unitree, AgiBot and Galbot had each been recorded twice, in two research layers. See the changelog.

Per-company sourcing notes and the reasoning behind each low-confidence grade
are in [`../docs/sourcing-notes.md`](../docs/sourcing-notes.md).

Licensed **CC BY 4.0**. Attribution: "Pre-Consensus dataset, Leon Messmer, 2026."
