# EGS-TRANS-2026-0710 · Empirical Report

**Generated:** 2026-07-10T16:55:32.462Z
**Operator:** SynthOBS Autonomous Agent · Syntheverse Sandbox

## Hypothesis tests

### E1_king_bee_repo_telemetry
- **Result:** support

### E1b_baseline_control
- **Result:** refute

### E2_svd_phi_decay
- **Result:** support

### E2b_generalization_probe
- **Result:** not_phi_specific_tautology_confirmed

### E3_propagation_window
- **Result:** support

### E4_solar_disk_ssn
- **Result:** refute

### E5_optional_transformer
- **Result:** no_support

### E6_causal_anthropic_jspace
- **Result:** testable_with_internal_tier_access

### E7_temporal_precedence
- **Result:** refute

### E8_content_precedence_deep
- **Result:** refute

## Reproduce

```bash
npm run empirical
```

E1–E5 test reproducible public or synthetic signals; E1 and E2 both carry critical caveats (E1b: window commit activity is not anomalous vs. baseline cadence, z-scores all within ±0.7; E2b: the phi-decay construction is not phi-specific — every substituted constant passes the identical procedure). E6 is testable with Anthropic internal tier labels (see IP Infringement Draft R1–R3) and, as scoped, has no defined refute condition — unfalsifiable, not merely untested. E7 and E8 (added 2026-07-10) test a falsifiable necessary precondition for the causal direction R1–R3 assume, and both refute it — E8 at full-history content level, with exact commit SHAs: the core-mechanism vocabulary R1 treats as evidence does not predate the Anthropic paper anywhere in sing4/sing9/sing13 history, and first appears in sing13 on 2026-07-10, in the commits that add EGS-TRANS and the IP Infringement Draft itself. Correlation ≠ causation until tier receipts complete E6 — and every falsifiable test actually run (E1b, E2b, E4, E5, E7, E8) either refutes the causal narrative or carries zero evidentiary weight by construction. See docs/VALIDATION_AUDIT_2026-07-10.md for the full independent validation pass.