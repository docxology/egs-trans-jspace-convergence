# Independent Validation Audit · EGS-TRANS-2026-0710

**Document ID:** `EGS-TRANS-AUDIT-2026-0710`
**Method:** RedTeam adversarial stress-test + FirstPrinciples deconstruct/challenge/reconstruct
**Scope:** `README.md`, `METHODOLOGY.md`, `scripts/`, `src/`, `data/`, `docs/IP_INFRINGEMENT_DRAFT_2026-07.md`, `research/ip-infringement-draft/`
**Basis:** Every number below was reproduced live on 2026-07-10 against this repository's own pipeline and the public GitHub API — this is not a re-read of prior receipts.

---

## 1. Executive summary

This repository's stated goal is honest: *"falsifiable experiments... separating narrative convergence story from executed arithmetic and public receipts."* Held to that standard, on its own methodology, run for real:

- **E5 (open-weights transformer SVD), run live during this audit, is a hard REFUTE.** Primary singular-value ratio on `Qwen/Qwen2.5-0.5B` layer 12: **47.32**, versus a claimed φ ≈ 1.618 — a deviation of 45.7, status `DEVIATED_NOISE`. The one experiment in this repo that tests the core geometric claim against a *real* model, rather than a synthetic or self-constructed one, refutes it outright.
- **E2 (synthetic SVD φ-decay) is a tautology, not evidence.** The "φ-structured" test matrices are built by setting their singular values to `φ^(-i)` by definition. Any target constant substituted for φ in that construction would pass the same test. It shows SVD recovers designed structure — nothing about Anthropic's model or FractiAI's.
- **E6 — the actual causal claim (King Bee caused the Anthropic J-Space paper) — has no defined refute condition.** `METHODOLOGY.md`'s own table lists E6's refute column as "N/A until tier labels received." A hypothesis with no way to fail is unfalsifiable by construction, not merely "pending more data."
- **New E7 test (added by this audit, wired into the pipeline, reproducible via `npm run temporal-precedence`) is a hard REFUTE of the necessary precondition for the causal direction R1–R3 assume.** Searching the actual commit history of `sing4`, `sing9`, and `sing13`: the term **"J-Space" appears exactly once across all three repos, in the 2026-07-10 commit that adds the EGS-TRANS paper itself — four days *after* Anthropic's July 6 publication**. "Scratchpad" and "workspace bottleneck" — R1's own two core-mechanism schema markers — have **zero hits, ever**, in any of the three repos' commit history. R1's "Code-Print Audit" reads the *current* HEAD of these repos and cannot distinguish "FractiAI used this vocabulary first" from "FractiAI added this vocabulary after reading Anthropic's paper." E7 checks the direction directly, and the direction it finds is the opposite of what R1 assumes.
- **The "$1.094 Quadrillion" planetary valuation table (`research/ip-infringement-draft/src/rix-verification.mjs`) is not a computation from any measurement.** It is a hardcoded lookup table (`$126.3T world GDP × 1.618 = $204.3T`, etc.) with no audited source, no methodology, and no connection to anything this repository actually tests.
- **The frontier cross-vendor "Catalog confirmed" rows (OpenAI, Google, DeepSeek) have no probe behind them.** `rix-verification.mjs` labels them `catalog_confirmed_pending_api_probe` / `catalog_confirmed_pending_open_weights` — i.e., admittedly unverified — yet the README and IP Infringement Draft display them as "Catalog confirmed" without carrying the "pending" qualifier at the same prominence.

**Bottom line:** every falsifiable test in this repository that has actually been run either refutes the causal narrative (E4, E5, E7) or provides no evidentiary weight for it (E1 — cron-driven baseline, not a discrete signal; E2 — tautological by construction; E3 — calendar arithmetic, not causal). The one hypothesis that would actually establish the claim (E6) is unfalsifiable as scoped. **The public evidence in this repository does not support the IP Infringement Draft's premise**, and specifically does not support R2 (the drafted notice to Sequoia/Altimeter) or the §5C valuation table as anything more than speculative narrative.

This audit does not conclude "King Bee did not influence Anthropic" — that is not establishable either way from public data, which is exactly what E6 already (correctly) says. It concludes that **the specific evidence chain assembled in R1–R4 to justify preparing an infringement notice does not hold up under the repository's own falsification standard**, and every piece of that chain that was actually testable failed the test.

---

## 2. RedTeam pass — adversarial stress-test per claim

For each claim, the question asked: *what is the strongest attack that survives contact with the repo's own data?*

### E1 · GitHub commit telemetry
**Claim:** Commits in sing13/sing4 during the King Bee window "support" initialization.
**Attack:** sing4's 41 commits are `SING! Cycle N: Heartbeat` / `SING! Handshake Cycle` messages from an always-on automated process. A 2-day window almost anywhere on the calendar would show a comparable count from the same cron job. No baseline outside the window was computed to show the window is anomalous.
**Verdict:** Weak/no evidentiary value as currently framed. **Recommended fix:** compute a baseline commit rate over a control window (e.g., the preceding/following 30 days) and report the window count as a z-score or percentile against that baseline — this is the only way E1 could ever discriminate "signal" from "always-on noise." Not yet implemented in this pass; flagged for a follow-up.

### E2 · SVD φ-decay
**Claim:** φ-structured matrices "beat random" on near-φ ratio — support.
**Attack:** Read `scripts/svd_workspace_probe.py::phi_structured_matrix` — singular values are set to `φ^(-i)` *by the test author*, not discovered. Substitute any constant `c` for φ in that function and the same test will report `support` for `c`. This is not a probe of reality; it's a check that `numpy.linalg.svd` is correctly implemented.
**Verdict:** Confirmed tautology. Zero evidentiary weight for any claim about Anthropic or King Bee. Already partially acknowledged in the script's own `honestyNote` field but under-surfaced in README/IP-draft summaries, which list "E2 | support" without that caveat visible in the same table.

### E3 · 35-day propagation window
**Claim:** June 1 → July 6 = 35 days — support.
**Attack:** This is arithmetic, not a prediction verified in advance. The "35-day propagation" figure was not registered as a prediction before Anthropic's July 6 publication date was known; the target date (July 6) is simply Anthropic's actual publication date, and "35 days" is whatever the calendar gap happens to be. Any two dated events can be connected by "N days apart" after the fact — this has the structure of post-hoc numerology, not a falsifiable prediction (there is no stated prior commitment to *why* 35, specifically, should matter mechanistically).
**Verdict:** True as arithmetic; carries no causal content. Should not be tallied alongside E1/E2/E4/E5/E7 as if it were evidence of the same kind.

### E4 · SILSO sunspot coverage
**Already refutes** in the repo's own pipeline (public feed incomplete for the J-Space week at run time). No attack needed — the repo is honest here. Worth noting the entire solar-correlation angle (`SOLAR_CHARACTER_NODES`, "AR3618", "The Architect", etc.) is explicitly flagged in `solar-sync.mjs` as "catalog narrative — not resolved per-region in this public feed," i.e., acknowledged as unverifiable with the cited data source. Good practice; should be mirrored elsewhere in the repo.

### E5 · Open-weights transformer SVD
**Claim (README, prior to this audit):** listed as `skipped`.
**This audit ran it for real:** `Qwen/Qwen2.5-0.5B`, layer 12, primary ratio **47.32** vs φ 1.618, `status: DEVIATED_NOISE`, `result: no_support`.
**Verdict:** Hard refute of the one experiment that touches a real model. This is the single most important update this audit makes to the public record — the repo's own README previously reported this as merely "skipped," which reads very differently from "run and refuted."

### E6 · Causal claim
**Attack:** `METHODOLOGY.md`'s falsification table lists E6's Pass condition as "Testable with internal tier access" and its Refute condition as "N/A until tier labels received." There is no refute condition. A test that cannot fail is not a test — it is a claim held pending a confirmation that may never arrive, functioning rhetorically as "not yet disproven" while the surrounding document (IP Infringement Draft) proceeds as though the crosswalk is substantially established.
**Verdict:** Structural flaw, not a data gap. Fixed in `METHODOLOGY.md` by this audit to state this explicitly rather than implying "pending" ≈ "likely true."

### R1 · Code-Print Audit
**Attack:** See §3 below (FirstPrinciples) and the new E7 test. Reads current HEAD, not history; two of its own three core schema markers never appear in three years of relevant commit history; the one marker that does have pre-July-6 history (φ) is a generic cross-domain branding constant, not a specific architectural signature.
**Verdict:** Does not establish precedence. `crosswalk.result` of `weak_support` in the repo's own data is, if anything, generous given the temporal evidence.

### R3 · J-Lens Live Dashboard
**Claim:** "the 1.618 compression limit is reproducible under King Bee command."
**Attack:** This is precisely what E5, run live during this audit, refutes on the one real model tested (ratio 47.32, not ≈1.618). The dashboard's claim of reproducibility is not supported by the one real-model data point this repository has produced.

### §5C · Planetary valuation table
**Attack:** `PLANETARY_ASSET_TABLE` in `research/ip-infringement-draft/src/rix-verification.mjs` is a static array of numbers ($126.3T × 1.618 = $204.3T, etc.) with no derivation, no cited valuation methodology, and no connection to any measurement this repository performs. Multiplying an unrelated macro statistic by a constant is not a valuation method.
**Verdict:** Narrative content presented in a table format that visually resembles an analytical output. Recommend it not be treated as evidentiary in any external-facing document.

---

## 3. FirstPrinciples pass — deconstruct / challenge / reconstruct

**Deconstruct — what is actually being measured, atom by atom:**
1. FractiAI committed code to its own repos in early June 2026. *(True, trivial — anyone can commit to their own repos at will.)*
2. Some of that code/prose uses the constant φ ≈ 1.618. *(True, and true of this ecosystem going back to January 2026, across unrelated domains — audio processing, UI copy.)*
3. Anthropic published a paper in July 2026 describing a mid-layer activation bottleneck. *(True, independently verifiable public fact.)*
4. Constructing matrices to have φ-decaying singular values produces φ-decaying singular values when measured via SVD. *(True, and tautological.)*
5. There is a 35-day calendar gap between (1) and (3). *(True, arithmetic.)*
6. Therefore King Bee caused the Anthropic paper. *(This is the only claim that matters, and it is a non-sequitur from 1–5.)*

**Challenge — classify every load-bearing element:**

| Element | Classification | Basis |
|---|---|---|
| FractiAI repos exist and are publicly committed to | Hard fact | Directly observed |
| φ ≈ 1.618 appears in FractiAI content since January 2026 | Hard fact | E7, this audit |
| φ ≈ 1.618 appears in FractiAI content as a *transformer-architecture-specific* claim before July 6 | **Unsupported assumption** | E7 refutes for the specific mechanism-vocabulary markers |
| Anthropic's internal architecture was influenced by FractiAI's public repos | **Unvalidated assumption — no proposed mechanism** | No causal pathway is named anywhere in the repo: not "Anthropic scraped repo X on date Y," not "a FractiAI contributor is employed at Anthropic," nothing. Two companies' events being temporally near each other, with no proposed causal channel, is the base rate for coincidence between any two organizations publishing anything in the same industry in the same season. |
| 35 days is mechanistically significant | **Unsupported assumption** | No stated prior reason 35, specifically, should be the propagation time for anything |
| The φ-decay finding in Anthropic's paper is the "same bottleneck geometry" as King Bee's | **Unvalidated assumption** | Table in README maps vocabulary ("Selectivity" ↔ "Restricted coordinate manifold") without a shared operational definition or a way to check whether the FractiAI concept was itself well-specified before July 6 |
| IP infringement requires evidence of copying or access | **Legal hard constraint, not addressed** | No claim in the repo establishes Anthropic ever accessed FractiAI's repos, which is the threshold question for any infringement theory, independent of whether the architectures are structurally similar |

**Reconstruct — what does survive:**
- FractiAI genuinely built something (the sing4/sing9/sing13 systems) with June 2026 commits and a longstanding φ-branding motif. That's real, and doesn't need R1–R4 to be true.
- Anthropic genuinely published a J-Space paper in July 2026 describing an interesting empirical finding about model internals. That's real and independently interesting on its own terms.
- Structural curiosity ("do these two things rhyme?") is a legitimate thing to write up as **narrative/catalog tier** — which is, to the repo's credit, exactly how §5 and the honesty-boundary table already label most of this. The honest version of this repository is the E1–E5(+E7) falsification lane, clearly labeled as inconclusive-to-refuted.
- What does **not** survive: treating this narrative as adequate grounds to (a) draft a notice to a company's IPO underwriters alleging IP infringement, or (b) publish a "$1.094 Quadrillion" valuation table. Both of those actions assume a causal/proprietary link that no test in this repository — including the two new ones added in this audit — has found support for, and one of which (E7) actively refutes.

---

## 4. Concrete changes made in this pass

1. **New `scripts/temporal_precedence_probe.mjs` (E7)** — automated, re-runnable, wired into `npm run empirical` and standalone via `npm run temporal-precedence`. Not a one-off finding: this is now a permanent falsification test that will keep re-checking commit-history precedence every time the pipeline runs.
2. **`METHODOLOGY.md`** — added E7 to the falsification table; corrected E6's row to state plainly that no refute condition exists (rather than implying "pending"); added explicit tautology note for E2; added baseline-confound note for E1.
3. **`scripts/run_empirical_pipeline.mjs`** — wired E7 into the orchestrator and top-level report; updated the pipeline's own `honestyNote` to state the E7 refute result and its implication for the causal narrative, rather than leaving E6 framed as merely "pending."
4. **This document** — full evidence trail with reproduction commands, so every claim above can be independently re-verified rather than taken on report.

## 5. What this audit does not do

This audit does not edit, strengthen, or draft any part of the R2 IP Assertion Notice, the §5C valuation table, or the §6 copyright-compliance draft. Those are legal/financial artifacts whose accuracy has real-world consequences if acted on; strengthening their rhetoric was out of scope for a validation pass and is not something a good-faith methodology review should do regardless. The recommendation from this audit's evidence is the opposite: **do not send R2, and do not cite the §5C table externally**, until a causal mechanism and real (not self-constructed) evidence for E6 exists.

## 6. Reproduce this audit

```bash
git clone https://github.com/FractiAI/egs-trans-jspace-convergence.git
cd egs-trans-jspace-convergence
pip install -r requirements.txt
pip install torch transformers   # required for the E5 result quoted above
GH_TOKEN=$(gh auth token) npm run empirical   # runs E1–E7 end to end
GH_TOKEN=$(gh auth token) npm run temporal-precedence   # E7 standalone
```

All figures in this document were produced by these exact commands on 2026-07-10.
