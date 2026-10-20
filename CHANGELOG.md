# Build log

What was built, in order, and why each change was made. Dates are when the work
landed; the dataset snapshot is August 2026 throughout.

The entries that matter most are the ones marked **method change** — those altered how
scores are computed, not just what the page looks like.

---

## v24 — Relational dataset, momentum derivatives, renamed Pre-Consensus — October 2026

**Method change.** The data is now a database rather than code.

- The entity data moved out of five JavaScript files into **seven keyed CSV tables** in
  `dataset/`: themes, regions, hubs, backers, ventures, positions, rounds.
  `dataset/schema.sql` declares their keys and constraints. `build.ps1` builds the page
  from the CSVs. What stays in `src/data/` is configuration that isn't tabular (role
  weights, niche rules, map outlines, listed exposure).
- Funding rounds used to be nested arrays inside each venture. They are now their own
  table. Roles and stakes, previously split between a `ROLES` map and per-venture
  `backers` arrays, are now one `positions` table.
- **`tools/build_sqlite.py`** loads everything into SQLite and fails on any broken key.
  CI runs it on every push and publishes `pre-consensus.sqlite` beside the page.
- **Three duplicates found and merged.** Primary keys exposed that Unitree, AgiBot and
  Galbot had each been recorded twice, once as headline profiles and once in the
  regional research. The duplicate AgiBot even shared an id, so the old lookup map
  silently kept the regional row. Merged rows keep the headline narrative and dated
  rounds and take the regional layer's graded valuation and provenance, which carry
  sourcing notes. Effect: ventures 527 → **524**, tracked value $3.25T → **$3.23T**,
  Robotics companies 70 → 67 and $135B → $117B. Robotics emergence moves 46 → 47.
  Conviction counts are unchanged, because backers were unioned.
- Verified by running old and new builds in a headless browser and diffing the full data
  model and the rendered text of all nine views. The only differences are those above.

**Momentum view** gains two sections below the lanes:

- A **signal table** per theme: trailing-twelve-month capital, momentum as a multiple,
  **acceleration** (momentum now against six months ago), **cadence** (median months
  between a company's rounds), median round, sample size, and a rolling T12M sparkline.
  The table can be sorted, and ⚠ marks themes too thin to read.
- A **round tape** listing all 203 dated rounds newest first, each with its step-up against the
  company's previous round, filterable by theme.

**Also**

- Renamed **Founder Radar → Pre-Consensus**.
- Fixed the CI parse check, which required the bundle to *end* in `</script>` and so
  could never pass against the full page.

---

## Repository tidy-up — October 2026

Prepared the project for publication as a repository rather than a working folder.

- Sources moved into `src/`, data layers into `src/data/`, sourcing notes into `docs/`
- `data.js` → `core.js`, `global.js` → `regional.js` — the old names were misleading
  (`global.js` read like "global variables"; it meant "global-coverage research")
- Build output moved to `build/` and git-ignored. Previously the 420 KB bundle sat beside
  its own sources, so every data edit looked like a 420 KB diff
- **Deleted stale artefacts**: `dist/` and two hand-made zips, all dated 5–6 August
  against a 25 August build. Anyone cloning the repo would have got output two
  dashboard versions out of date
- Added `README.md` (analysis narrative), `METHODOLOGY.md` (every formula and its
  defensibility), `LICENSE` (MIT for code, CC BY 4.0 for the dataset), `.gitattributes`
- Added CI that rebuilds on every push and **checks the bundle actually parses** — the
  build is a text concatenation, so a bad data edit produces a syntactically invalid
  bundle that renders as a blank page rather than an error. That had already happened
  twice

---

## v23 — Graph clarity fixes

Four faults found by measuring rather than looking:

- **The globe showed zero labels.** Labels only resolved when rotation stopped, but
  rotation is on by default — so no hub was ever named. Rotation is slow enough that
  labels can stay up while it turns, so they now re-resolve a few times a second
- **The Horizon quadrant had 9 overlapping labels.** Deconfliction correctly bails when
  labels are hidden by the narrow-viewport media query, but never re-ran when the window
  widened. Resize now re-renders it
- **The Brief read out of order** — long shots and the sector lens sat before the main
  argument in the DOM
- **Half the niche map was anonymous grey dots.** 43 of 85 niches hold fewer than three
  companies, making their lifecycle phase meaningless. Added a "Readable only" toggle and
  counts on the phase chips

Verified at narrow and desktop width: zero label overlaps on all three graphs.

## v22 — Interactive globe

Replaced the flat equirectangular map with a hand-rolled orthographic globe on canvas.
Drag to spin, scroll to zoom, auto-rotates when idle.

The flat projection stretched the poles badly and the dataset had become genuinely
global. Far-side points are projected onto the limb so polygons stay closed instead of
tearing. Markers hide when they rotate to the back, and shrink and fade toward the edge.

Hub sizing also changed: previously tracked value alone, which made Africa and Latin
America nearly invisible because those regions rarely disclose valuations. Now blends
value with venture count, so real activity shows up without a published number.

## v21 — Seed layer, and a method correction — **method change**

Added **94 verified pre-seed and seed rounds** (Jan 2025 – Aug 2026), roughly tripling
coverage at the early end: 38 → 94 at seed or below.

Sourced from funding press and government grant registries rather than fund portfolio
pages. That was the fix to a sourcing error — portfolio pages list companies that already
scaled, which is why the board had drifted late.

**The method correction.** Both research passes independently flagged that a seed label
no longer implies an early company — AMI Labs raised ~$1B at seed, Unconventional AI
$475M at $4.5B. Median seed in the cohort is ~$16M against a ~$60M mean.

Since emergence weights stage at 20% as an earliness proxy, four mega-seeds were scoring
as maximally early and dragging the index. Maturity is now derived from **substance
rather than label** — money raised and price paid — and only ever adjusted upward. Six
companies reclassified.

This is the most consequential change in the project. It's the difference between
measuring the company and measuring the press release.

## v20 — Stage filter and long shots

Added a stage filter over normalised maturity (44 distinct raw stage strings exist in the
data, so they had to be bucketed) and a "long shots" section surfacing early-stage
companies with a named operator attached rather than only a fund.

## Earlier work

**Zoom and label deconfliction.** Graph labels overlapped badly once the dataset grew.
Implemented greedy cartographic collision detection — sort by weight, keep or hide — plus
pan/zoom with constant on-screen marker size. One bug introduced and fixed here: an
infinite `requestAnimationFrame` loop, now bounded to five retries.

**Asia-Pacific completion.** Japan/Korea (35 companies) and Australia/NZ/Singapore (33)
integrated. Finding: Japan, Korea and Australia are as state-anchored as China — 93 rows
across the dataset carry sovereign or state capital.

**Eight-region expansion.** 163 companies across Europe, Greater China, India, Middle
East, Africa and Latin America. This forced the provenance fields: a confidence grade on
the *valuation* separate from the company, an entity-type flag for figures that aren't
priced rounds at all (HUMAIN's "$100B" is a programme spend announcement; G42's ">$100B"
was back-solved by the press from Microsoft's stake), a state-capital marker, and a
separate legal domicile where it differs from where a company operates.

**Niche layer** — **method change**. The 16 themes were too broad to spot anything early,
so an 85-niche taxonomy was added with regex classification rules and a lifecycle phase
per niche, computed from Herfindahl concentration and year-on-year acceleration. A
three-company floor was imposed after 2-company niches were being labelled
"Consolidating" on no evidence.

**Momentum switched to log2** — **method change**. Raw percentage change produced
readings like "+5576%" when a niche grew from near-zero. Arithmetically correct,
analytically useless.

**UI consolidation.** Nine views reorganised into 6 nav groups with sub-tabs, after tab
proliferation made the thing unreadable. Filters made contextual per view — they had been
appearing on views they couldn't affect.

**Contrast audit.** 119 elements measured below 4:1, worst at 2.77:1 — theme hues were
being used as text when they were tuned for fills. Added a lightening pass. Verified zero
failures after.

**Performance rebuild.** The dashboard stopped starting. Root cause was eager rendering —
all nine views built on load, ~233 canvases and 752 cells. Switched to lazy per-view
rendering with bitmap-cached procedural marks. 233 → 94 canvases; reopen 40ms → 0.2ms.

**Exposure channel.** Public companies and ETFs mapped to each private theme, with a
proxy-quality score (0–5) rating how faithfully listed markets track the private thesis.
This produced the project's strongest empirical result: **proxy quality correlates with
emergence at r = −0.66**. A listed pure-play appearing *is* what it looks like when a
theme stops being early.

**Involvement layer** — **method change**. Added roles, not just ownership. Time is
scarcer than money, so running a company (weight 6) outweighs writing a cheque (1). Past
roles count half for scoring but keep full classification, so a relinquished chairmanship
still reads as deep involvement.

**Emergence index** — **method change**. The original board ranked what was already big.
Six independently-directional factors were added to score how early a theme still is,
which is the actual question the project exists to answer.

**Initial build.** Dark-mode dashboard of private-company positions held by technology
operators, grouped by theme, with procedurally generated company marks (no external
images are possible — see the CSP constraint in README).

---

## Bugs worth remembering

Kept because each one cost real time and the lesson generalises.

**`SECTORS is not defined` shipped for two published versions.** An index-based
replacement spanned two declarations and silently deleted `SECTORS`/`SECTOR_GAPS`, so
`renderBrief` threw on every load. Element counting masked it — the page looked
populated. Only found by trapping `window.onerror`.

**A blank page from a syntax error.** An edit replaced a function header but left its old
body orphaned at the top level, producing an illegal top-level `return`. Nothing rendered.
The console reader showed nothing useful; what caught it was compiling the page's own
script with `new Function()` and reading the parse error. **That check is now the first
response to a blank page**, and it's what the CI step automates.

**Three phantom sub-tabs.** `.subtabs{display:flex}` overrides the user-agent
`[hidden]{display:none}` rule. Every element toggled via `hidden` needs an explicit
override. Compounding the problem, the original verification checked the `.hidden`
property rather than computed `display`, which is why it was wrongly reported as working.

**Data corrections from challenge.** Nscale $3B → **$14.6B**. AMI Labs New York →
**Paris**. Sierra ~$10B → **$15.8B**. Palmer Luckey reclassified from operator to *board
member* at Erebor. All found by re-checking claims rather than trusting the first source.
