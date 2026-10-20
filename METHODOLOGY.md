# Methodology

Every score in Pre-Consensus, with its formula, the reasoning behind its construction,
what it does *not* claim, and the objection it invites.

The last part matters most. A score you can't attack is a score you haven't understood.

---

## The two axes

Everything else supports these. They are deliberately independent: one measures
**belief**, the other measures **how much room is left**.

### Conviction

**Definition.** The number of tracked backers independently holding a position in a
theme.

```
conviction = count of distinct operators with ≥1 position in the theme
```

**Why a count and not a sum.** Money follows consensus; people precede it. One fund
writing a $2B cheque is one judgement. Eight unrelated people each writing $20M is eight
judgements that happened to converge — far more informative, and invisible to any
dollar-weighted measure. Weighting by capital would simply rediscover which themes are
already large, which is the question this project exists *not* to answer.

**What it does not mean.** Nothing about stake size, influence, or correctness. Anduril
having seven backers is a consensus signal, not a quality signal.

**The objection: "a16z and one angel both count as 1."** Correct. Backers are therefore
classified as **Founders / Solo investors / Funds** with a filter on each. Switch to
Founders only and you get the original signal without institutions inflating the count.

---

### Emergence (0–100, higher = earlier)

Six factors, each an independent indicator of earliness. Identical code computes it for
themes and for niches.

| Factor | Weight | Formula | Captures |
|---|---|---|---|
| Stage centroid | 20% | `100 × (1 − (avgM − 1) / 6)` | Seed-weighted, not late-weighted |
| Median valuation | 20% | log scale $0.1B–$500B, inverted | Still cheap in absolute terms |
| Capital recency | 20% | share of disclosed capital raised in trailing 12m | Money arriving *now* |
| Operator-run | 15% | `100 × Σ(roleWeight − 1) / (positions × 3)` | People committing time, not just money |
| Pre-institutional | 15% | inverse share of companies with crossover/sovereign backers | Institutions haven't arrived |
| No public proxy | 10% | binary — 100 if no listed pure-play exists | You can't buy it yet |

```
emergence = 0.20·stage + 0.20·price + 0.20·recency
          + 0.15·operatorRun + 0.15·preInstitutional + 0.10·noProxy
```

**Grades.** ≥55 emergent · ≥38 building · below that mature.

**Why six rather than one.** Any single measure is noisy or gameable. A theme can look
early on price but late on stage, or early on stage but already crowded with sovereign
money. Requiring six independent indicators to agree is the entire point — it's what
makes a high score mean something beyond "small".

**Why these weights.** The first three factors are objective and directly measurable, so
they carry 60% between them. Operator-run and pre-institutional depend on classification
judgement, so 30%. Public-proxy existence is binary and coarse, so only 10%.

**Stated plainly: the weights are reasoned, not derived.** No optimisation sits behind
them, because there is no outcome data to optimise against.

**The objection: "you picked weights to get the answer you wanted."** The honest answer
is that nothing was fitted to any outcome, and the Horizon view publishes all six
components separately precisely so this can be checked. Re-weight them and see whether
the ordering survives. In practice the top and bottom are stable; the middle shuffles.
That's the correct level of confidence to have in it.

---

## Supporting scores

### True maturity (m, 1–7) — and the correction that matters

Every venture carries a normalised maturity, because raw stage labels are useless on
their own: **44 distinct stage strings** appear in this dataset, from "Seed" to
"Consortium JV".

**The problem.** A seed label no longer implies an early company:

| Company | "Seed" round | Valuation |
|---|---|---|
| AMI Labs | ~$1B | — |
| Unconventional AI | $475M | $4.5B |
| Periodic Labs | $300M | $1.3B |
| Merge Labs | $252M | $850M |

Median seed in the cohort is ~$16M against a ~$60M mean — the gap is these four.

**The fix.** Maturity is derived from substance, and **only ever adjusted upward**:

```
valuation ≥ $1B    or raise ≥ $150M  →  treated as growth      (m = 4)
valuation ≥ $300M  or raise ≥ $50M   →  treated as Series B    (m = 3)
                      raise ≥ $20M   →  treated as Series A    (m = 2)
```

Six mega-seeds were reclassified. Before the fix they scored as maximally early on a
20%-weighted factor and dragged the whole index.

**Why only upward.** Adjusting downward would mean overriding a disclosed later-stage
label with an inference, which is a much stronger claim than declining to believe that a
$475M round is early.

---

### Role weights — the involvement layer

**The premise.** Time is scarcer than money. A person can fund a hundred companies, but
can only run one and sensibly chair two or three. Where someone spends time is a
stronger signal than where they spend capital.

```
runs it        6
co-founded     5
chairs         4
board seat     3
advises        2
capital only   1
```

A relinquished role (`|past`) counts **half for scoring** but retains **full
classification**. Altman's Oklo chairmanship still reads as deep involvement despite him
stepping down in April 2025 — he gave up the seat so Oklo could sell power to OpenAI,
which is itself the signal.

**The objection: "role data is thin."** Agreed, and materially thinner than funding
data — board seats at private companies are rarely announced. This layer therefore
**understates** involvement. "Capital only" means no role was found, not that none
exists.

---

### Lifecycle phase (niches only)

From two computed signals: **capital concentration** (Herfindahl index over tracked
value) and **year-on-year acceleration**.

```
< 3 companies                    →  Nascent        (both metrics meaningless)
hhi > 0.6  and  accel < 1        →  Settled
hhi > 0.6                        →  Consolidating
≥ 5 companies  and  accel < 0.8  →  Crowded
accel ≥ 1.5                      →  Heating
otherwise                        →  Contested
```

Herfindahl is the standard antitrust concentration measure — the sum of squared shares.
1.0 means a single company *is* the niche.

**The three-company floor is load-bearing.** With two companies, concentration is
trivially high and acceleration is one data point over another. 43 of 85 niches sit below
the floor and are labelled Nascent rather than given a phase they can't support.

---

### Momentum

```
momentum = log2(recent 12m capital / prior 12m capital),  clamped to [−2, +3]
```

Zero means flat. Used as the Y axis of the niche map.

**Why logarithmic.** Raw percentage change produced readings like **"+5576%"** when a
niche grew from near-zero. Arithmetically correct, analytically useless, and it made the
axis unreadable. Log scale makes a doubling and a halving symmetrical around zero.

The Momentum view's signal table shows the same quantity per theme, but displays the
**raw multiple** (e.g. 2.4×). The clamp exists to keep a chart axis readable and must not
turn a genuine 10× into a ceiling value. "new" means nothing was disclosed in the prior
window. "—" means nothing in either window, which is no data, not flat.

### Momentum derivatives (themes, Momentum view)

All three are computed from the 203 dated rounds. Only the 91 hand-profiled headline
ventures carry round dates, so these describe the larger, better-reported end of each
theme. A theme with fewer than four dated rounds in two years is marked ⚠.

```
T12M(t)      = Σ round size with date in [t−1, t)      (window ending NOW left open)
momentum(t)  = log2(T12M(t) / T12M(t−1)),  clamped [−2, +3]
acceleration = momentum(NOW) − momentum(NOW − 0.5)
cadence      = median over companies of months between consecutive rounds   (≥ 3 gaps)
step         = round size / same company's previous round size              (round tape)
```

**Acceleration** separates "still growing" from "growing faster". A theme can post
strong year-on-year momentum while that momentum is already falling. That pattern is
what a top looks like before the totals turn. The six-month offset is a judgement call,
not a fitted parameter: the two windows still share half their rounds, which damps
noise but also slows the signal.

**Cadence** measures competition for allocation. When the gap between a company's rounds
shortens, investors are pre-empting rather than waiting for milestones. It is a median,
not a mean, because a single bridge round two months after a priced round would
otherwise dominate. It needs at least three gaps per theme to be shown at all.

**Step** compares round sizes, not valuations. Round size is disclosed far more often
than price, and a growing cheque size is the more robust signal across regions.

**What these are not.** Like emergence, they have never been backtested. With 203 rounds
spread across sixteen themes, one large round moves a thin theme's momentum by a
whole doubling. Read the sign and the rank, not the decimal.

---

### Proxy quality (0–5)

How faithfully listed instruments track the **private** thesis. 5 means pure-plays exist
and you can own the thesis directly; 0 means no public company anywhere represents it.

**The finding this enables.** Proxy quality correlates with emergence at **r = −0.66**.
The more buyable a theme is, the less early it is.

**Why this isn't circular.** Public-proxy absence is only 10% of the emergence weighting,
so the correlation is not an artefact of construction. The causal mechanism is
straightforward: a listed pure-play appears *because* the companies in a theme grew large
enough to go public, which means the repricing already happened. The ticker is the
evidence that you're late.

---

## Provenance flags

These exist because the dataset went global, and non-US disclosure is not comparable to
US disclosure.

**`conf` — high / med / low.** Confidence in the **valuation**, not the company. A
low-confidence grade means the figure is press-reported, back-solved, or wildly out of
line with the last arm's-length mark. Each carries its reason.

> Kunlunxin's $50B is flagged because it is ~17× its last arm's-length valuation *and*
> IPO investors were reportedly asked to buy chips at 3–7× their subscription.

**`ent` — state / self / spac.** Rows that are **not priced venture rounds at all** and
must never be presented as though they were:
- HUMAIN's "$100 billion" is a **programme spend announcement**
- G42's ">$100B" was **back-solved by the press** from Microsoft's stake
- Baykar, Fergani and TOGG are self-funded
- XTEND, Pasqal and newcleo are SPAC-announced

**`st` — state capital.** Where a sovereign fund anchors a round, the valuation reflects
industrial policy and land subsidy rather than a competitive auction. Japan, Korea and
Australia turn out to be as state-anchored as China.

**`dom` — legal domicile**, shown separately where it differs from the operating hub. The
Delaware flip is close to mandatory for a Latin American company raising a US round, and
collapsing the two would misattribute the activity.

**`uni` / `grant`** — university or national-lab origin, and public grant money held
alongside equity. Added with the seed layer because both are strong pre-venture signals.

---

## Defending this in a room

The four objections that actually land, and the honest answer to each.

**1. "Survivorship bias."** Concede immediately — it's the strongest objection. Fund
portfolio pages drop failures, so the older layers are lists of companies that haven't
died yet. The seed layer is better sourced (funding press and grant registries, which
don't retroactively delete) but the earlier layers aren't, and the gap can't be
quantified from public data.

**2. "It's never been backtested."** Also concede. One snapshot, nothing to test against.
A high score says the market has not repriced this; it says nothing about direction.
Never let it be heard as a forecast.

**3. "Absence of data isn't absence of fact."** Correct. 371 of 525 ventures have no
disclosed valuation, and non-US companies disclose far less. Regional dollar comparisons
measure disclosure practice as much as activity — which is why venture counts and
emergence are the figures to quote across borders, not dollar sums.

**4. "The dataset reflects whoever you chose to track."** True and deliberate.
Agriculture, water, care delivery and education are largely absent because venture
economics dislike them, not because they're unimportant. That's stated as a finding with
a reason for each gap, rather than padded to look balanced.

---

## What has deliberately not been built

Named here so their absence reads as a decision rather than an oversight:

- **First-cheque scoring** — who was in earliest, weighted by how early
- **Talent-flow layer** — senior engineers moving between companies, which usually leads
  funding by a year or more
- **Co-investment graph** — who syndicates with whom, and which pairs predict outcomes
- **Change-log diffs** — what moved between snapshots, which needs a second snapshot
- **TAM and capital-to-TAM ratio** — offered but not built, because published market-size
  reports are marketing documents and anchoring a quantitative index to them would import
  their bias wholesale
- **A backtest** — the one that would most improve the project, and the one that needs
  time to pass rather than more work
