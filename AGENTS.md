# krabidEx — BC-OS Operating Contract

This file applies to the entire repository. It defines how AI-assisted work must be
planned, explained, implemented, and verified.

## Mission

Build krabidEx quickly without turning development into unexplained automation.
The user must become able to understand, modify, debug, and extend the system.
Optimize every step for **speed, comprehension, and security**.

## Non-negotiable project rules

- Use JavaScript, not TypeScript, unless the user explicitly requests TypeScript.
- Use ethers v6.
- Use Hardhat and Hardhat Ignition. Do not introduce Ganache.
- Keep Solidity, dependency, network, and deployment changes explicit and discussed.
- Explain why every important change is needed.
- Do not introduce unnecessary dependencies, abstractions, or refactors.
- Work on one architectural layer at a time.
- End each feature or change in an objectively verifiable state.
- Keep repository documentation and code comments in English.
- Treat the project as pre-alpha and unaudited. Never use real funds.

If the repository contradicts these rules, report the contradiction before changing
it. Do not silently normalize the project.

## BC-OS actors

Choose and state one actor before every significant step:

### `[GPT]`

Use for inspection, diagnosis, architecture, explanations, trade-off analysis, and
deciding the next move. GPT must lead when a choice affects architecture, security,
invariants, or money/tokens.

### `[YO]`

Use when the user personally performing the work has meaningful pedagogical value:
fundamental terminal or Git commands, small edits worth understanding, and direct
interaction with Hardhat, ethers, or smart contracts.

Do not turn `[YO]` into mechanical copying of large or repetitive changes.

### `[CODEX]`

Use after the relevant concept and acceptance criteria are understood, when the work
is mainly implementation: multi-file changes, repetitive tests, controlled refactors,
broad debugging, or edit-run-fix cycles.

Codex must not silently introduce architecture or concepts that have not been
discussed. If the user's request already authorizes a well-understood implementation,
Codex may proceed after stating the BC-OS step. Otherwise, stop for the required
decision or authorization.

### `[CHECKPOINT]`

Use when understanding a concept is necessary before implementation. Keep the
checkpoint short, visual when useful, and directly applied to krabidEx. Pause coding
until the required understanding or decision is established.

## Required step format

Before every significant step, communicate:

1. **OBJECTIVE** — the concrete outcome.
2. **WHY NOW** — why this is the next logical move.
3. **ACTOR** — `[GPT]`, `[YO]`, `[CODEX]`, or `[CHECKPOINT]`.
4. **WHAT I MUST UNDERSTAND** — only the concepts required for this step.
5. **ACTION** — one small, bounded action.
6. **VERIFICATION** — the objective success condition.

A significant step includes contract behavior, architecture, dependencies,
configuration, deployments, security assumptions, new features, or multi-file work.
For a trivial continuation inside an already explained and authorized step, do not
repeat the full ceremony unnecessarily.

## Knowledge checkpoints

### Level A — understand before proceeding

- Architecture and trust boundaries
- Smart-contract security
- Internal ledger and token ownership
- Allowance
- Transaction lifecycle
- Invariants
- Order book
- Fees
- Signing
- Provider versus signer
- Deployment

Stop implementation when a new Level A concept or unresolved decision appears.

### Level B — explain just in time

- Hardhat APIs
- ethers APIs
- React hooks
- Configuration syntax
- Commands and language syntax

Explain only what is needed for the current action.

### Level C — defer safely

Internal details that do not yet affect the user's decisions or ability to debug the
current layer may be deferred. Name the deferral when it could otherwise look like a
gap.

## Implementation guardrails

- Inspect the current branch, working tree, applicable instructions, and relevant
  files before editing. Preserve unrelated user changes.
- Never advance several layers in one change.
- Define acceptance criteria before implementation.
- Prefer the smallest complete vertical slice that proves one behavior.
- Do not write code the user lacks the context to understand.
- Do not make the user manually reproduce boilerplate or repetitive cases.
- Do not change contract behavior during tooling, documentation, or configuration
  work.
- Do not add a dependency, choose a network, define a fee model, or select a token
  compatibility policy without explaining the trade-off first.
- Do not use blind dependency remediation such as `npm audit fix`.
- Do not commit, push, deploy, publish, or mutate remote state unless the user's task
  authorizes that action.
- Never expose or commit secrets, private keys, seed phrases, or funded credentials.

When a task touches architecture, security, invariants, or money/tokens, stop at the
decision boundary and return control to the user before implementation.

## Verification discipline

Every change must finish with the strongest relevant verification:

- Documentation-only: inspect the exact diff and run `git diff --check`.
- Contracts or tests: run focused tests, then the full suite.
- Configuration or dependencies: perform a clean install when relevant, compile, and
  run the full suite.
- Frontend: run tests when present and a production build.
- Deployment: prove a repeatable local Ignition deployment before any public network.

The current backend commands are run from `backend/`:

```bash
npm ci
npm test
```

Report exact pass/fail counts and any skipped verification. Distinguish code failures
from environment failures. In particular, Hardhat error `HHE905` may mean the Solidity
compiler list could not be downloaded; do not change project code merely to hide that
environment problem.

## Current verified baseline

Reference checkpoint before this operating contract:
`cd4ea8d855c1622b637c719371694da74388c6e4` on `main`.

- The repository is backend-only; there is no frontend in the visible history.
- `backend/contracts/Token.sol` provides the OpenZeppelin ERC-20 test token.
- `backend/contracts/Exchange.sol` implements ERC-20 deposit, withdrawal, and an
  internal per-token/per-user ledger.
- The last verified suite result is **15 passing, 0 failing**.
- There are no project deployment scripts or Ignition modules yet.
- `feeAccount` and `feePercent` are stored but fees are not implemented.
- The current TypeScript Hardhat configuration contradicts the JavaScript-only rule.
  Report and resolve it as its own checkpoint; do not mix it with contract changes.

This is a historical baseline, not a substitute for inspection. At the start of a
future cycle, verify the current Git state and test results before relying on it.

## Roadmap and gates

1. **Persist BC-OS** — this operating contract.
2. **Reproduce the baseline** — the user runs the fundamental local workflow.
3. **JavaScript/Hardhat checkpoint** — understand the current configuration and its
   TypeScript contradiction.
4. **Minimal JavaScript migration** — configuration only; preserve all behavior and
   all 15 baseline tests.
5. **Controlled toolchain sanitation** — decide versions first; no blind upgrades.
6. **Robust ERC-20 custody** — prove isolation across users/tokens and operation
   sequences; decide the non-standard-token policy.
7. **Hardhat Ignition local deployment** — one repeatable deployment path.
8. **Order book** — checkpoint the lifecycle and invariants before implementation.
9. **Fees and trades** — agree on units, recipient, rounding, and invariants first.
10. **Frontend and wallet** — checkpoint provider, signer, approvals, and transaction
    states before integration.
11. **Testnet and security hardening** — only after every earlier gate is verified.

Keep the user's current roadmap position visible in progress reports. Do not start a
later gate while an earlier gate remains objectively open.

## Immediate next position

After this file is present on `main`, the next action is Gate 2: `[YO]` reproduces the
baseline locally with a clean checkout, `npm ci`, `npm test`, and `git status`.
