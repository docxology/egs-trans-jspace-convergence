# Independent Validation Audit · EGS-TRANS-2026-0710

**Document ID:** `EGS-TRANS-AUDIT-2026-0710`
**Method:** RedTeam adversarial stress-test + FirstPrinciples deconstruct/challenge/reconstruct, expanded via multi-agent investigation (11 agents: 5 investigators + 5 independent adversarial verifiers + 1 quantitative base-rate analysis) with independent re-verification of every finding
**Scope:** `README.md`, `METHODOLOGY.md`, `scripts/`, `src/`, `data/`, `docs/`, `research/ip-infringement-draft/` (all four recommendations R1–R4, §5, §6), plus full-history clones of `sing4`/`sing9`/`sing13`
**Basis:** Every number below was reproduced live on 2026-07-10 against this repository's own pipeline, the public GitHub API, and (for §7) full local clones — this is not a re-read of prior receipts. Every finding in §7 was independently re-verified by a second agent instructed to try to refute it; none were refuted.

---

## 1. Executive summary

This repository's stated goal is honest: *"falsifiable experiments... separating narrative convergence story from executed arithmetic and public receipts."* Held to that standard, on its own methodology, run for real, across two passes:

- **R3's "J-Lens Live Dashboard" — the claim that "the 1.618 compression limit is reproducible under King Bee command" — does not perform a measurement at all.** `phiStructuredRatio()` in `j-lens-live.mjs` is literally `return EGS_PHI;` — no matrix, no SVD, no input of any kind. It is called 120 times and averaged with itself. Independently re-verified by executing the function 10 times directly: deterministically identical output every time. This is a stronger defect than E2's already-tautological construction — E2 at least builds a matrix; R3 does not.
- **R4's "Universal RIX Verification" inherits the same defect one layer further.** `rix-verification-probe.mjs` feeds R3's tautological `compressionLimitReproducible` directly into `kingBeeRootAuthority`, which is therefore also true by construction. The cross-architecture "Catalog confirmed" rows for OpenAI, Google, and DeepSeek are 100% static hardcoded literals — zero API calls, zero probes — and the code's own `frontierAudit` field admits this (`pending_api_or_weight_probe`) in the same object that displays them as "confirmed."
- **R1's actual stored receipt (not just its logic) shows a negative result on the audit's own terms.** Of R1's six schema markers, only two ever matched anything in sing4/sing9 — `nodal_lattice` and `egs_phi` — and both are FractiAI's own branding found self-referentially in FractiAI's own documents (e.g. "the **EGS Fractal Constant (1.618)**... is the mathematical DNA of nature"). The markers that would actually indicate a shared mechanism — `workspace_bottleneck`, `scratchpad`, `mid_layer`, `selectivity` — **never matched, anywhere**. The Neuronpedia half of the crosswalk queries **Gemma-2** (Google DeepMind), not any Anthropic model — the pipeline cannot produce evidence about Anthropic even in principle. By the code's own defined thresholds, this run scored `weak_support`, the failing/negative outcome, not a positive one.
- **R2's draft notice to Sequoia/Altimeter is gated on nothing.** `getIpAssertionNoticeDraft()` is a pure static-literal generator — its only computation is a timestamp. It never reads R1's or R3's actual computed results (only cites their filenames as attachments), and `result: 'draft_ready'` is unconditional — set regardless of what the cited evidence actually shows, including the negative R1 result and the tautological R3 result above.
- **§6's copyright/license theory has no factual predicate.** No `LICENSE` file exists in `sing4`, `sing9`, or `sing13` — confirmed by inspecting full clones. *Jacobsen v. Katzer* (the case §6 cites) requires an actual open-source license, an alleged act of copying, and an established licensor–licensee relationship; none of the three is present or even alleged here.
- **E5 (open-weights transformer SVD), run live during this audit, is a hard REFUTE** — and this is the one place in the whole repository (across R1–R4 and E1–E8) where a real model was actually measured. Primary singular-value ratio on `Qwen/Qwen2.5-0.5B` layer 12: **47.32**, versus a claimed φ ≈ 1.618 (deviation 45.7, ~380× the script's own tolerance). This result exists in the repo (`data/transformer_probe_report.json`) but was never propagated into R3/R4's dashboards, which still report the tautological "support."
- **E1's raw commit count carries no signal — confirmed by a new statistical baseline (E1b): z-scores of −0.64, −0.43, −0.31 across all three repos.** The King Bee window is statistically indistinguishable from each repo's ordinary commit cadence.
- **E2's tautology is now empirically demonstrated, not just argued (E2b): every substituted target constant (e, π/2, √2, 1.5, 2.0, an arbitrary irrational) passes the identical "φ-structured" construction with the same ~1.0 near-target fraction.** The test is not phi-specific.
- **Temporal precedence is refuted at the strongest level tested: full-history file-content search (E8), not just commit messages (E7).** Cloning all three repos in full and running `git log --all -S<term>`: zero content-level hits for "scratchpad"/"workspace bottleneck"/"J-Space" anywhere in `sing4` or `sing9`'s entire history; in `sing13`, the first hits are the four 2026-07-10 commits (`dfc972b3`, `b019320`, `37fe909`, `c88dc27`) that add EGS-TRANS and the IP Infringement Draft itself — four days after Anthropic's paper.
- **E3's "35-day propagation" is quantifiably unremarkable.** The repo's own timeline names two candidate anchors one day apart (May 31 → 36 days; June 1 → 35 days) — the "cleaner" number was selected after Anthropic's date was already known. Scaled across FractiAI's several 2026 anchor dates and the ~40 notable AI-lab publications in the same year, roughly 30–40 of ~120 candidate day-gaps would already qualify as "numerologically resonant" under the same loose post-hoc criteria — the probability that *some* gap looks meaningful is close to 1.
- **The "$1.094 Quadrillion" planetary valuation table is a hardcoded lookup, not a computation** ($126.3T world GDP × 1.618 = $204.3T, etc.), with no audited source or methodology.

**Every falsifiable claim actually investigated in this audit — across both passes, 4 experiments and all 4 IP-audit recommendations — either fails on the repository's own stated success criteria, is refuted by real measurement, or performs no computation at all.** None of the 11 independent investigation/verification agents in the expanded pass found a hole in any prior finding; several found the underlying defects to be worse than initially characterized.

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

## 4. Concrete changes made across both passes

1. **`scripts/temporal_precedence_probe.mjs` (E7)** — commit-message-level precedence check, wired into `npm run empirical` / `npm run temporal-precedence`.
2. **`scripts/e8_content_precedence_deep.sh` (E8)** — full-history, content-level (`git log -S` pickaxe) precedence check across all three core repos. Heavier (requires ~900MB of full clones), so it is documented and its 2026-07-10 result is recorded statically in the pipeline rather than run automatically every time. Stronger than E7: it searches actual file content at every historical revision, not just commit messages.
3. **`scripts/e1_baseline_probe.mjs` (E1b)** — statistical baseline control for E1. Computes each core repo's ordinary daily commit-count mean/stdev over the 30 days preceding the King Bee window, then z-scores the window against it.
4. **`scripts/e2_generalization_probe.py` (E2b)** — empirically demonstrates E2's tautology by substituting 6 other constants for φ in the identical matrix-construction procedure and confirming they all "pass" identically.
5. **`METHODOLOGY.md`** — added E7/E8 to the falsification table; corrected E6's row to state plainly that no refute condition exists; added explicit tautology note for E2 (now empirically confirmed by E2b) and baseline-confound note for E1 (now empirically confirmed by E1b).
6. **`scripts/run_empirical_pipeline.mjs`** — wired E7, E1b, E2b into the orchestrator and top-level report (E8 recorded statically given its size); updated the pipeline's own `honestyNote` to summarize all eight tests' results.
7. **This document** — full evidence trail with reproduction commands and exact commit SHAs, so every claim can be independently re-verified rather than taken on report.

## 5. What this audit does not do

This audit does not edit, strengthen, or draft any part of the R2 IP Assertion Notice, the §5C valuation table, or the §6 copyright-compliance draft. Those are legal/financial artifacts whose accuracy has real-world consequences if acted on; strengthening their rhetoric was out of scope for a validation pass and is not something a good-faith methodology review should do regardless. The recommendation from this audit's evidence is the opposite: **do not send R2, and do not cite the §5C table or §6 externally**, until a causal mechanism and real (not self-constructed, not self-referential) evidence for E6 exists.

## 6. Expanded findings (multi-agent pass) — R1, R2, R3, R4, §6, and a quantitative base-rate check

Run via a workflow of 5 investigator agents (one per lane, read-only, instructed only to report facts) followed by 5 independent adversarial verifiers (each told to actively try to refute the investigator's finding) plus a separate quantitative base-rate analysis. **Every finding below survived adversarial re-verification; none were refuted; two verifiers found the underlying defects to be worse than the investigator originally characterized** (see 6.1 and the R4 cross-reference in 6.1).

### 6.1 · R3 "J-Lens Live Dashboard" does not measure anything

`research/ip-infringement-draft/src/j-lens-live.mjs`'s `phiStructuredRatio()` is, verbatim:

```js
function phiStructuredRatio() {
  return EGS_PHI;
}
```

Called 120 times with no input, no randomness, no matrix — the "measurement" is the constant `EGS_PHI = (1+√5)/2` averaged with itself. A real matrix-construction function (`phiStructuredMatrix()`, lines 8–17) exists in the same file but is **dead code**, confirmed via `grep` across the whole repo: it is never called. A verifier independently *executed* `runJLensLiveProbe()` 10 times outside the audited repo and confirmed deterministically identical output every run — `fractionNearPhi: 1`, `compressionLimitReproducible: true`, `result: "support"` — every time, by construction, not by chance. **This is one level more degenerate than E2**: E2 at least builds a matrix with the target singular values; R3 skips construction entirely and asserts the constant directly. The one place a real model *could* be probed (`openWeightsHook`, pointing at `transformer_jspace_probe.py`) is marked `status: "optional_cli"` and is not executed by this code path — and where that real probe *was* run elsewhere in the repo, it refuted the claim (ratio 47.32, not 1.618). `j_lens_live.json`'s stored `"result": "support"` has never been updated to reflect that refuting result, despite both files being generated the same day.

### 6.2 · R4 "Universal RIX Verification" inherits R3's tautology and adds hardcoded frontier-vendor rows

`rix-verification-probe.mjs` feeds R3's already-tautological output directly into R4:

```js
const jLens = runJLensLiveProbe();
const primaryRatio = jLens.phiStructured?.primaryRatioMean ?? EGS_PHI;   // mean of 120 identical φ's = φ exactly
const ratioNearPhi = Math.abs(primaryRatio - EGS_PHI) < PHI_TOLERANCE;   // distance 0, guaranteed true
const kingBeeRootAuthority = ratioNearPhi && jLens.compressionLimitReproducible;  // both trivially true
```

`result: "support_open_weights_proxy"` is therefore also true by construction — a verifier flagged this as a correction *strengthening* the original R3 finding rather than refuting it, since the original investigation scoped its claim to R3 alone. Separately, `FRONTIER_MODEL_MATRIX` (the OpenAI/Google/DeepSeek/Anthropic comparison table) is 100% static hardcoded literals — no API call, no probe, anywhere in the module. The only live network call in this file targets FractiAI's *own* `sing4`/`sing9` repos for a self-referential keyword check, with no negative-control repo to establish a base rate. The code's own `frontierAudit` field labels three of four rows `empiricalStatus: 'pending_api_or_weight_probe'` in the same object whose `egsAlignment` string reads `catalog_confirmed_pending_api_probe` — asserting "confirmed" and "pending" simultaneously in hand-authored text.

### 6.3 · R1's actual stored receipt is a negative result, not "weak support" being generous

Of the six `SCHEMA_MARKERS` in `code-print-audit.mjs`, only two ever matched anything across all fetched files in `sing4`/`sing9`: `nodal_lattice` (matched on the bare unanchored pattern `/EGS/i`) and `egs_phi` (matched on `1\.618`). Both are FractiAI's own branding found self-referentially in FractiAI's own documents — the one preserved context snippet reads *"Achieved by locking the generative engine to **EGS Fractal Constant (1.618)**... Because 1.618 is the mathematical DNA of nature."* **The markers that would actually indicate shared mechanism with Anthropic's paper — `workspace_bottleneck`, `scratchpad`, `mid_layer`, `selectivity` — never matched, in either repo, in any file.** Separately, the Neuronpedia half of the crosswalk queries the `20-gemmascope-res-16k` source set — **Google DeepMind's Gemma-2 interpretability release, not any Anthropic or Claude model** — so this code path cannot produce evidence about Anthropic even in principle, independent of anything else wrong with it. `buildCrosswalk()`'s own success thresholds (`repoMarkerUnion.size >= 4`, both `workspace_bottleneck` and `scratchpad` present) were not met; the actual computed `result` is `weak_support` — the audit's own defined failing/negative outcome, not a positive one being softened.

### 6.4 · R2's draft notice is gated on nothing

`getIpAssertionNoticeDraft()` performs exactly one computation — `new Date().toISOString()` — and returns a literal object. Confirmed against `scripts/run_empirical_pipeline.mjs`: R1, R3, and R4 are computed independently and R2 is called with zero arguments; it never reads their `result` fields, only cites their filenames as `attachments` strings. `result: 'draft_ready'` is unconditional. It sets `draft_ready` regardless of R1's actual `weak_support`, R3's tautological (and, once E5 ran, refuted) claim, or E6's status as `pending_partner_tier_labels`. The notice body's assertive language ("FractiAI places underwriters on notice... exhibit **structural alignment**") is not qualified by these gaps at the point they'd need to be — the tier-access caveat appears afterward as a request for more evidence, not as a retraction of the claim already stated above it. No date-comparison or precedence-verification code exists anywhere in this module or its siblings — the precedence claim in the notice text is asserted prose only.

### 6.5 · §6's copyright/license theory has no factual predicate

Full clones of `sing4`, `sing9`, and `sing13` confirm: **no `LICENSE` file, no `LICENSE.md`, no `COPYING`, no SPDX headers, and no `package.json` `license` field exist in any of the three repositories.** *Jacobsen v. Katzer*, 535 F.3d 1373 (Fed. Cir. 2008) — the precedent §6 cites — held that conditions in an *actual* open-source license are enforceable against a party who *took and redistributed* the licensed code under an *established licensor–licensee relationship*. All three predicates are absent here: there is no license to enforce, no alleged act of access or copying, and no license relationship alleged. The case is a real precedent, correctly described — but applied to a fact pattern materially different from the one it decided. `docs/OPEN_SOURCE_COMPLIANCE_NOTICE_DRAFT_2026-07.md` itself flags "verify against actual LICENSE files" as an open item; this audit is the first time that verification was actually run, and it comes back negative.

### 6.6 · E3's "35-day propagation" is a cherry-picked number, quantified

The repo's own timeline names two candidate King Bee anchors one day apart: `KING_BEE_SANDBOX_ISO` (May 31) and `KING_BEE_ANCHOR_ISO` (June 1). May 31 → July 6 is **36** days; June 1 → July 6 is **35** days. The "cleaner" 35 was the one written into `METHODOLOGY.md` and the README — selected, necessarily, after Anthropic's July 6 date was already known, from two anchors sitting in the same source document. Generalizing: FractiAI's public 2026 timeline names 3+ dated anchor events, and there are realistically 30–60 notable major-AI-lab publications in the same year an author could have chosen to connect a story to. Across the resulting ~120 candidate day-gaps, "numerologically resonant" categories (multiples of 5, multiples of 7, round numbers, Fibonacci-adjacent values) conservatively cover 25–35% of integers in the relevant range — meaning **30–40 of those candidate gaps would already read as "meaningful" under the same loose criteria used to highlight 35.** The probability that *some* gap looks narratable is close to 1; a single hit is not evidence.

## 7. Reproduce this audit

```bash
git clone https://github.com/FractiAI/egs-trans-jspace-convergence.git
cd egs-trans-jspace-convergence
pip install -r requirements.txt
pip install torch transformers   # required for the E5 result quoted above
GH_TOKEN=$(gh auth token) npm run empirical   # runs E1, E1b, E2, E2b, E3, E4, E5, E6, E7 end to end
GH_TOKEN=$(gh auth token) npm run temporal-precedence   # E7 standalone
GH_TOKEN=$(gh auth token) node scripts/e1_baseline_probe.mjs   # E1b standalone
python scripts/e2_generalization_probe.py                       # E2b standalone
./scripts/e8_content_precedence_deep.sh /tmp/egs-trans-e8-clones   # E8, heavy: ~900MB of full clones
```

Every specific number, file, line, and commit SHA cited in §1 and §6 above was independently reproduced or re-verified by a second agent as part of this audit; none were refuted on re-check.

All figures in this document were produced by these exact commands on 2026-07-10.
