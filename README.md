# Founder Radar

**A private-market conviction index.** It tracks what 78 technology operators, solo
investors and deep-tech funds actually back in private companies — and scores every
theme on *how early it still is*.

527 ventures · 8 regions · 16 themes · 85 niches · snapshot August 2026

---

## The problem this exists to solve

Every venture dashboard tells you where the money went. That is the wrong question,
because by the time capital shows up in aggregate statistics the repricing has already
happened. Ask "where is the money?" in 2026 and the answer is *AI infrastructure* —
which you already knew, and which is already expensive.

The useful question is harder: **what are the people with the best information
committing to, in places the market has not priced yet?**

Two design decisions follow from that, and they're what make this different from a
funding tracker:

**1. Count people, not dollars.** Conviction here is the number of *independent*
backers in a theme, never the capital total. One fund writing a $2B cheque tells you
less than eight unrelated people each writing $20M, because the eight had to reach the
same conclusion separately. Dollar-weighting just rediscovers which themes are already
large.

**2. Score earliness explicitly, and separately.** A theme gets an *emergence* score
from six independent indicators — stage, price, capital recency, whether operators run
it or merely fund it, whether institutional money has arrived, and whether you can buy
it on a public exchange. High conviction plus high emergence is the interesting
quadrant. High conviction plus low emergence is just consensus.

---

## What's in the dataset

| | |
|---|---|
| Private ventures | **527** (371 have never disclosed a valuation) |
| Tracked value | **$3.25T** last-known post-money, private only |
| Backers | **78** — 37 build or run things, the rest allocate |
| Themes / niches | **16** / **85** (42 hold enough companies to score) |
| Regions | **8**, all populated |
| Verified pre-seed & seed rounds | **94** |

**By region** — North America 196 · Europe 86 · Asia-Pacific 78 · Greater China 49 ·
India 29 · Middle East 26 · Africa 20 · Latin America 13

**By stage** — Pre-seed & Seed 94 · Series A 89 · Series B–C 209 · Series D+ 119 ·
Pre-IPO & Listed 16

Every row carries provenance: a confidence grade on the *valuation* (not the company),
an entity-type flag where the figure is not a priced round at all, a state-capital
marker, and a separate legal domicile where it differs from where the company operates.

---

## Findings

These are the outputs, not the inputs. Each is reproducible from the dataset.

### Buyability is inversely correlated with earliness — r = −0.66

The strongest empirical result here. Each theme is scored 0–5 on *proxy quality*: how
faithfully listed markets track the private thesis. Plotted against emergence, the
relationship is clearly negative.

This is not circular — public-proxy absence carries only 10% of the emergence weighting.
The mechanism is real: **a listed pure-play appearing is what it looks like when a theme
stops being early**, because the companies got large enough to list, which means the
repricing already happened. By the time there's a clean ticker, you're late.

### The highest-emergence themes are not the ones getting attention

| Theme | Emergence | Backers | Companies |
|---|---|---|---|
| World Models & Simulation | **71** | 8 | 8 |
| Preventive Health | **69** | 8 | 15 |
| AI for Science | **61** | 14 | 54 |
| Neural Interface | **59** | 11 | 8 |
| Longevity & Reprogramming | **58** | 9 | 5 |

Compute scores as the loudest theme by tracked value, and the dashboard reports it as
such — but see the first limitation below before quoting that.

### A seed round no longer tells you a company is early

This broke the scoring and had to be fixed. Four rounds labelled *seed* in this dataset:

| Company | "Seed" round | Valuation |
|---|---|---|
| AMI Labs | ~$1B | — |
| Unconventional AI | $475M | $4.5B |
| Periodic Labs | $300M | $1.3B |
| Merge Labs | $252M | $850M |

Median seed in the cohort is **~$16M against a ~$60M mean**. Since emergence weights
stage at 20% as an earliness proxy, these four were scoring as *maximally early* and
dragging the index with them.

Maturity is now derived from **substance rather than label**, and only ever adjusted
upward — never down. Six mega-seeds were reclassified. This is the single most important
correction in the project's history, and it's why the index measures the company rather
than the press release.

### Public money funds the risky half, and it shows up before venture does

Of the 94 verified seed rounds, a substantial minority hold government grants alongside
equity — ARPA-H, DoD, NASA, NSF SBIR in the US; EIC Accelerator, SPRIND, NATO DIANA,
UK NSSIF, EIFO in Europe; the Israel Innovation Authority; SGInnovate in Singapore.

Pixel Photonics is the clearest case: €13.5M total, of which an €8.5M EIC Accelerator
award, **with the German state innovation agency also on the cap table as an equity
investor**. Grant registries are public, they predate priced rounds, and unlike VC
portfolio pages they don't quietly delete failures. They are the best pre-venture signal
in the dataset.

### Universities, not accelerators, are the actual source of deep tech

Roughly a third of European seed rounds trace to a named institution — ETH, EPFL,
Imperial, TU Eindhoven, Cambridge, Münster, Politecnico di Torino. In the US: NIST
(Great Sky), Sandia (Photon Queue), UChicago with Harvard co-founders (CavilinQ), MIT
(Vertical Semiconductor), the Baker lab lineage (Accipiter).

One case is a *corporate* spinout and worth separating: Invisix came out of ASML after a
decade of internal incubation. Same structure, entirely different risk profile.

### Half the niche layer is a watchlist, and the metric says so

43 of 85 niches hold fewer than three companies. Below that threshold both concentration
and acceleration are arithmetically meaningless, so they're labelled *Nascent* and
excluded from the lifecycle read rather than given a spurious phase. The dashboard has a
toggle to hide them.

That's not a gap in the data — it's the metric correctly refusing to read a trend from
two data points.

### The board reflects its subjects

Agriculture, water, care delivery and education are largely absent. Not because they
don't matter, but because venture economics dislike them: long cycles, fragmented
buyers, price-regulated customers. Stated as a finding with a reason for each gap,
rather than padded out to look balanced.

---

## Limitations

Read these before quoting any number. They're ordered by how much they should worry you.

**Compute's top ranking leans on low-confidence valuations.** YMTC, SiCarrier and
Kunlunxin are all marked low-confidence, and they materially drive the "hottest theme"
headline. Kunlunxin's $50B mark is ~17× its last arm's-length valuation, and IPO
investors were reportedly asked to buy chips at 3–7× their subscription. The headline
follows the data; the data carries caveats.

**Survivorship bias is real and unmeasured.** This is the strongest objection to the
whole project. Fund portfolio pages quietly drop failures, so the older layers of the
dataset are lists of companies that haven't died yet. The seed layer is better sourced —
funding press and grant registries, which don't retroactively delete — but the earlier
layers aren't, and there's no way to quantify the gap from public data.

**Emergence has never been backtested.** There's one snapshot, so there's nothing to
test against. A high score means *the market has not repriced this*. It does **not** mean
*this will go up*. Do not let anyone hear it as a forecast.

**The weights are reasoned, not derived.** Nothing was fitted to any outcome, because
there's no outcome data to fit to. The Horizon view shows all six factors separately so
anyone can re-weight and check whether the ordering survives — mostly the top and bottom
are stable and the middle shuffles.

**Absence means "not found", never "does not exist."** 371 of 525 ventures have no
disclosed valuation, and non-US companies disclose far less. Comparing regions on dollar
totals measures *disclosure practice* as much as activity. Venture counts and emergence
travel across borders; dollar sums don't.

**Role data is thinner than funding data.** Board seats at private companies are rarely
announced. A position showing "capital only" means no role was found — not that none
exists. This layer systematically understates involvement.

**It's a snapshot, not a feed.** Researched August 2026. A published single-file build
cannot fetch anything at runtime (see *Constraints*), so figures age until the dataset
is rebuilt.

---

## Method

Full formulas, worked reasoning and the defensibility notes for each score are in
**[METHODOLOGY.md](METHODOLOGY.md)**. In brief:

- **Conviction** — count of independent backers holding a position. Not dollars.
- **Emergence (0–100)** — six weighted factors: stage centroid 20%, median valuation
  20%, capital recency 20%, operator-run 15%, pre-institutional 15%, no public proxy 10%.
- **Role weighting** — time is scarcer than money, so running a company (6) outweighs
  writing a cheque (1). Past roles count half for scoring but keep full classification.
- **Lifecycle phase** — Herfindahl concentration plus year-on-year acceleration, with a
  three-company floor below which neither is computed.
- **Momentum** — `log2(recent / prior)`, deliberately logarithmic: raw percentages
  produced readings like "+5576%" when a niche grew from near-zero.
- **Proxy quality (0–5)** — how faithfully listed markets track the private thesis.

---

## Repository layout

```
├── src/
│   ├── app.html              markup, CSS, all application logic
│   └── data/
│       ├── core.js           themes, operators, roles, geography, headline ventures
│       ├── seedlings.js      funds and smaller ventures
│       ├── regional.js       the eight-region research layer, with provenance fields
│       ├── seed-rounds.js    94 verified pre-seed and seed rounds
│       └── niches.js         niche taxonomy, classification rules, exposure map
├── docs/
│   └── sourcing-notes.md     per-company confidence rationale and sourcing trail
├── build.ps1                 concatenates the layers into one self-contained file
├── METHODOLOGY.md            every score, formula and caveat
└── build/                    generated, git-ignored
```

Data layers load in order — `core.js` defines the themes, hubs and regions that later
layers reference by id.

### Build

```powershell
./build.ps1
```

Emits `build/radar.html` (open locally) and `build/radar.body.html` (for publishing).
No dependencies, no package manager, no install step.

---

## Constraints worth knowing

The dashboard is published as a single self-contained HTML file whose
Content-Security-Policy **blocks every external fetch** — no CDN, no web fonts, no image
hosts, no data API. That constraint shaped the whole codebase:

- Company marks are **drawn procedurally on canvas** from a seeded PRNG, because no
  image can be loaded.
- Typography uses **system font stacks only**.
- The globe is hand-rolled orthographic projection on canvas — no mapping library.
- Live market data is impossible without self-hosting. The Exposure view is explicitly a
  researched snapshot with an "as of" date, not a quote feed.

---

## Verifying the data

The dataset is plain JavaScript object literals, deliberately readable rather than
minified. `docs/sourcing-notes.md` carries the per-company reasoning, including why each
low-confidence valuation is flagged.

If you find an error, open an issue with the source. Corrections already applied from
exactly that kind of challenge: Nscale $3B → **$14.6B**, AMI Labs New York → **Paris**,
Sierra ~$10B → **$15.8B**, and Palmer Luckey reclassified from operator to *board member*
at Erebor.

---

## Licence

Code **MIT**. Dataset **CC BY 4.0**. See [LICENSE](LICENSE).

Nothing here is investment advice.
