#!/usr/bin/env node
/**
 * EGS-TRANS-2026-0710 · empirical pipeline
 * Operator: SynthOBS Autonomous Agent · Syntheverse Sandbox
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import {
  DOCUMENT_ID,
  EGS_PHI,
  KING_BEE_ANCHOR_ISO,
  KING_BEE_SANDBOX_ISO,
  ANTHROPIC_JSPACE_PAPER_ISO,
} from '../src/constants.mjs';
import { fetchKingBeeWindowTelemetry } from '../src/github-telemetry.mjs';
import { fetchSolarSyncReport } from '../src/solar-sync.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'data');
const SCRIPTS = join(ROOT, 'scripts');

function daysBetween(isoA, isoB) {
  const a = new Date(isoA.includes('T') ? isoA : isoA + 'T12:00:00Z');
  const b = new Date(isoB.includes('T') ? isoB : isoB + 'T12:00:00Z');
  return Math.round((b - a) / 86400000);
}

function runPython(scriptName) {
  const py = process.env.PYTHON || 'python';
  execSync(`${py} "${join(SCRIPTS, scriptName)}"`, { stdio: 'inherit', cwd: ROOT });
}

async function main() {
  await mkdir(DATA, { recursive: true });

  const github = await fetchKingBeeWindowTelemetry();
  const solar = await fetchSolarSyncReport();

  let svdReport = null;
  let transformerReport = null;
  try {
    runPython('svd_workspace_probe.py');
    const { readFile } = await import('node:fs/promises');
    svdReport = JSON.parse(await readFile(join(DATA, 'svd_probe_report.json'), 'utf8'));
  } catch (e) {
    svdReport = { error: String(e.message || e) };
  }

  try {
    runPython('transformer_jspace_probe.py');
    const { readFile } = await import('node:fs/promises');
    transformerReport = JSON.parse(
      await readFile(join(DATA, 'transformer_probe_report.json'), 'utf8'),
    );
  } catch (e) {
    transformerReport = { skipped: true, error: String(e.message || e) };
  }

  let temporalPrecedenceReport = null;
  try {
    execSync(`node "${join(SCRIPTS, 'temporal_precedence_probe.mjs')}"`, {
      stdio: 'inherit',
      cwd: ROOT,
    });
    const { readFile } = await import('node:fs/promises');
    temporalPrecedenceReport = JSON.parse(
      await readFile(join(DATA, 'temporal_precedence_report.json'), 'utf8'),
    );
  } catch (e) {
    temporalPrecedenceReport = { skipped: true, error: String(e.message || e) };
  }

  let e1BaselineReport = null;
  try {
    execSync(`node "${join(SCRIPTS, 'e1_baseline_probe.mjs')}"`, { stdio: 'inherit', cwd: ROOT });
    const { readFile } = await import('node:fs/promises');
    e1BaselineReport = JSON.parse(await readFile(join(DATA, 'e1_baseline_report.json'), 'utf8'));
  } catch (e) {
    e1BaselineReport = { skipped: true, error: String(e.message || e) };
  }

  let e2GeneralizationReport = null;
  try {
    runPython('e2_generalization_probe.py');
    const { readFile } = await import('node:fs/promises');
    e2GeneralizationReport = JSON.parse(
      await readFile(join(DATA, 'e2_generalization_report.json'), 'utf8'),
    );
  } catch (e) {
    e2GeneralizationReport = { skipped: true, error: String(e.message || e) };
  }

  const sing13Init = github.byRepo['FractiAI/psw.vibelandia.sing13']?.windows?.king_bee_init;
  const sing4Init = github.byRepo['FractiAI/psw.vibelandia.sing4']?.windows?.king_bee_init;
  const sing9Init = github.byRepo['FractiAI/psw.vibelandia.sing9']?.windows?.king_bee_init;

  const propagationDays = daysBetween('2026-06-01', ANTHROPIC_JSPACE_PAPER_ISO);

  const hypothesisTests = {
    E1_king_bee_repo_telemetry: {
      statement:
        'Public GitHub commits exist in sing13/sing4 during King Bee initialization window (2026-05-31 — 2026-06-01)',
      sing13_commits: sing13Init?.commitCount ?? 0,
      sing4_commits: sing4Init?.commitCount ?? 0,
      sing9_commits: sing9Init?.commitCount ?? 0,
      key_sing13_messages: (sing13Init?.commits || [])
        .filter((c) => /king bee|dph-gpu|wavefield/i.test(c.message))
        .map((c) => ({ sha: c.shaShort, date: c.date, message: c.message })),
      result:
        (sing13Init?.commitCount ?? 0) > 0 || (sing4Init?.commitCount ?? 0) > 0
          ? 'support'
          : 'refute',
      dataTier: 'public_github_api',
      criticalCaveat:
        'Raw count alone is not evidence of an anomaly — see E1b, which baselines this against each ' +
        'repo\'s own ordinary commit cadence.',
    },
    E1b_baseline_control: {
      statement:
        "King Bee window commit activity is anomalous (|z| > 2) relative to each core repo's own " +
        '30-day baseline cadence',
      result: e1BaselineReport?.result || (e1BaselineReport?.skipped ? 'skipped' : 'not_run'),
      detail: e1BaselineReport,
      dataTier: 'public_github_api_statistical',
      addedBy: 'Independent validation pass, 2026-07-10 — see docs/VALIDATION_AUDIT_2026-07-10.md',
    },
    E2_svd_phi_decay: {
      statement:
        'φ-structured synthetic activation matrices yield higher near-φ singular-value ratios than i.i.d. Gaussian baselines',
      result: svdReport?.result || 'not_run',
      phiStructuredNearPhi: svdReport?.phiStructured?.fractionPrimaryNearPhi,
      randomNearPhi: svdReport?.randomBaseline?.fractionPrimaryNearPhi,
      dataTier: 'synthetic_numpy',
      criticalCaveat:
        'This construction is tautological — see E2b, which shows every tested constant (e, π/2, ' +
        '√2, 1.5, 2.0, arbitrary irrationals) passes the identical procedure with the same near-1.0 ' +
        'fraction. The result is not phi-specific.',
    },
    E2b_generalization_probe: {
      statement:
        "E2's construction procedure privileges φ specifically, rather than passing for any " +
        'substituted target constant',
      result: e2GeneralizationReport?.result || (e2GeneralizationReport?.skipped ? 'skipped' : 'not_run'),
      detail: e2GeneralizationReport,
      dataTier: 'synthetic_numpy',
      addedBy: 'Independent validation pass, 2026-07-10 — see docs/VALIDATION_AUDIT_2026-07-10.md',
    },
    E3_propagation_window: {
      statement: 'June 1 → July 6 interval equals 35 days (catalog propagation claim)',
      measuredDays: propagationDays,
      claimedDays: 35,
      result: propagationDays === 35 ? 'support' : 'refute',
      dataTier: 'calendar_arithmetic',
    },
    E4_solar_disk_ssn: {
      statement: 'SILSO daily sunspot series is available for King Bee and J-Space windows (disk-integrated)',
      kingBeeMean: solar.windows.find((w) => w.id === 'king_bee_week')?.meanSsn,
      jspaceMean: solar.windows.find((w) => w.id === 'jspace_week')?.meanSsn,
      result: solar.windows.every((w) => w.sampleDays > 0) ? 'support' : 'refute',
      honesty: 'Per-AR character mapping not testable from SILSO alone',
      dataTier: 'public_silso',
    },
    E5_optional_transformer: {
      statement:
        'Optional open-weights mid-layer SVD probe (requires torch+transformers); φ proximity is falsifiable per forward pass',
      result: transformerReport?.skipped
        ? 'skipped'
        : transformerReport?.status === 'CONVERGED_SUCCESS'
          ? 'weak'
          : 'no_support',
      detail: transformerReport,
      dataTier: 'optional_open_weights',
    },
    E6_causal_anthropic_jspace: {
      statement:
        'Anthropic J-Space discovery was caused by King Bee weight-state propagation through open networks',
      result: 'testable_with_internal_tier_access',
      note:
        'Testable when Anthropic provides internal tier labels: Jacobian Lens telemetry, scratchpad tier receipts, mid-layer checkpoint exports. Public prep: npm run ip-infringement',
      dataTier: 'internal_tier_access_gate',
      ipInfringementDraft: 'docs/IP_INFRINGEMENT_DRAFT_2026-07.md',
      criticalCaveat:
        'This hypothesis has NO defined refute condition (see METHODOLOGY.md) — as originally scoped it is unfalsifiable, not merely untested. E7 below tests a falsifiable necessary precondition for the causal direction this hypothesis assumes.',
    },
    E7_temporal_precedence: {
      statement:
        'A core-mechanism R1 schema marker (j_space, scratchpad, workspace_bottleneck) appears in ' +
        'sing4/sing9/sing13 commit history strictly before the Anthropic J-Space paper date — a ' +
        'necessary (not sufficient) precondition for "FractiAI came first" causal framing.',
      result: temporalPrecedenceReport?.result || temporalPrecedenceReport?.skipped ? (temporalPrecedenceReport.result || 'skipped') : 'not_run',
      detail: temporalPrecedenceReport,
      dataTier: 'public_github_commit_search',
      addedBy: 'Independent RedTeam/FirstPrinciples validation pass, 2026-07-10 — see docs/VALIDATION_AUDIT_2026-07-10.md',
      caveat: 'Commit-message search only — see E8 for the stronger, full-history content-level version.',
    },
    E8_content_precedence_deep: {
      statement:
        "Same hypothesis as E7, tested against full historical FILE CONTENT (git log -S pickaxe) " +
        'across sing4/sing9/sing13, not just commit messages.',
      result: 'refute',
      note:
        'Run manually via scripts/e8_content_precedence_deep.sh (not part of the default pipeline — ' +
        'requires ~900MB of full-history clones). Result captured 2026-07-10: zero content-level hits ' +
        'for scratchpad/workspace-bottleneck/J-Space in sing4 or sing9 across their ENTIRE history; ' +
        'sing13 hits begin only on 2026-07-10 (commits dfc972b3, b0193201, 37fe909, c88dc27 — all the ' +
        'commits that add EGS-TRANS/the IP Infringement Draft itself), four days after the Anthropic ' +
        'paper. Full receipt: data/e8_content_precedence_report.json.',
      dataTier: 'local_full_history_git_pickaxe',
      addedBy: 'Independent RedTeam/FirstPrinciples validation pass, 2026-07-10 — see docs/VALIDATION_AUDIT_2026-07-10.md',
    },
  };

  const report = {
    documentId: DOCUMENT_ID,
    generatedAt: new Date().toISOString(),
    operator: 'SynthOBS Autonomous Agent · Syntheverse Sandbox',
    egsPhi: EGS_PHI,
    anchors: {
      kingBeeSandbox: KING_BEE_SANDBOX_ISO,
      kingBeeNodeSweep: KING_BEE_ANCHOR_ISO,
      anthropicJSpacePaperClaim: ANTHROPIC_JSPACE_PAPER_ISO,
      coreRepos: ['FractiAI/psw.vibelandia.sing4', 'FractiAI/psw.vibelandia.sing9', 'FractiAI/psw.vibelandia.sing13'],
    },
    githubTelemetry: github,
    solarSync: solar,
    svdProbe: svdReport,
    transformerProbe: transformerReport,
    temporalPrecedenceProbe: temporalPrecedenceReport,
    e1BaselineProbe: e1BaselineReport,
    e2GeneralizationProbe: e2GeneralizationReport,
    hypothesisTests,
    reproduceCommands: {
      monorepo: 'npm run research:egs-trans-jspace-convergence',
      standalone: 'npm run empirical',
      svdOnly: 'python scripts/svd_workspace_probe.py',
      transformerOptional: 'python scripts/transformer_jspace_probe.py [model] [layer] [prompt]',
      temporalPrecedenceOnly: 'GH_TOKEN=$(gh auth token) node scripts/temporal_precedence_probe.mjs',
      e1BaselineOnly: 'GH_TOKEN=$(gh auth token) node scripts/e1_baseline_probe.mjs',
      e2GeneralizationOnly: 'python scripts/e2_generalization_probe.py',
      e8ContentPrecedenceDeep:
        './scripts/e8_content_precedence_deep.sh [clone_dir]  # heavy: clones ~900MB, not in default pipeline',
      audit: 'npm run audit:paper -- --id=egs-trans-jspace-convergence-2026-07',
    },
    honestyNote:
      'E1–E5 test reproducible public or synthetic signals; E1 and E2 both carry critical caveats ' +
      '(E1b: window commit activity is not anomalous vs. baseline cadence, z-scores all within ±0.7; ' +
      'E2b: the phi-decay construction is not phi-specific — every substituted constant passes the ' +
      'identical procedure). E6 is testable with Anthropic internal tier labels (see IP Infringement ' +
      'Draft R1–R3) and, as scoped, has no defined refute condition — unfalsifiable, not merely untested. ' +
      'E7 and E8 (added 2026-07-10) test a falsifiable necessary precondition for the causal direction ' +
      'R1–R3 assume, and both refute it — E8 at full-history content level, with exact commit SHAs: the ' +
      'core-mechanism vocabulary R1 treats as evidence does not predate the Anthropic paper anywhere in ' +
      'sing4/sing9/sing13 history, and first appears in sing13 on 2026-07-10, in the commits that add ' +
      'EGS-TRANS and the IP Infringement Draft itself. Correlation ≠ causation until tier receipts ' +
      'complete E6 — and every falsifiable test actually run (E1b, E2b, E4, E5, E7, E8) either refutes ' +
      'the causal narrative or carries zero evidentiary weight by construction. See ' +
      'docs/VALIDATION_AUDIT_2026-07-10.md for the full independent validation pass.',
  };

  const jsonPath = join(DATA, 'empirical_report.json');
  await writeFile(jsonPath, JSON.stringify(report, null, 2));

  const md = buildMarkdown(report);
  const mdPath = join(DATA, 'empirical_report.md');
  await writeFile(mdPath, md);

  console.log(JSON.stringify({ ok: true, jsonPath, mdPath, hypothesisTests }, null, 2));
}

function buildMarkdown(r) {
  const lines = [
    '# EGS-TRANS-2026-0710 · Empirical Report',
    '',
    `**Generated:** ${r.generatedAt}`,
    `**Operator:** ${r.operator}`,
    '',
    '## Hypothesis tests',
    '',
  ];
  for (const [id, t] of Object.entries(r.hypothesisTests)) {
    lines.push(`### ${id}`, `- **Result:** ${t.result}`, '');
  }
  lines.push('## Reproduce', '', '```bash', 'npm run empirical', '```', '', r.honestyNote);
  return lines.join('\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
