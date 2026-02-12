# README_EXECUTION
Execution protocol for Pep Talk

This file defines how work is executed in this repo.

## Preflight
Before any edit:
- git status must be clean or explained
- git identity must be correct
- build must be green

Commands
- cd "$(git rev-parse --show-toplevel)"
- git status --short
- git config user.name
- git config user.email
- npm -C app/web run build

If any step fails, stop.

## Execution Method
- One task at a time
- No speculative refactors
- No while we are here changes
- No route changes without explicit approval
- No regex edits on TS or TSX logic blocks
- Output must be bashable and deterministic

Every task plan must include
- spec section being implemented
- files expected to change
- explicit scope not being touched
- verification command
- stop point

## Verification
After changes:
- npm -C app/web run build
- git diff --stat
- git diff
- git status --short

## Commit Discipline
- One intent per commit
- No generated artifacts committed
- Never commit with a failing build
## VS Code Terminal Stability and Hydration Lite (LOCKED)

Purpose
Keep new chats from crashing VS Code or bloating output. Hydration must be lightweight by default.

Rules
- Every command block MUST start with an explicit cd (repo root or $HOME), so copy/paste is deterministic.
- Prefer python3, never python.
- Avoid large terminal dumps. Do not print hundreds of lines across many files during “hydration.”
- If deeper proof is required, read only the minimum excerpt needed to verify wiring.

Hydration Lite (default)
Use this instead of dumping many files:
- Show repo state (branch, HEAD, clean tree)
- Show 30–80 lines max per file excerpt
- Prefer targeted grep/rg to prove facts

Recommended hydration commands
cd "$(git rev-parse --show-toplevel)"

git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git status --short

# Prove what matters without dumping entire docs
sed -n '1,120p' docs/README_FEEDER.md
sed -n '1,160p' docs/README_EXECUTION.md
sed -n '1,200p' docs/_status/current_state.md
sed -n '1,220p' docs/_status/next_task.md

# Targeted proof beats scrolling
rg -n "NEXT SINGLE ACTION|UGC production hardening" docs/_status/current_state.md docs/_status/next_task.md -S

VS Code crash triage (when terminal exits with code 1/127)
- First suspect: VS Code workspace terminal overrides forcing zsh.
- Check workspace settings: <repo>/.vscode/settings.json
- NOTE: .vscode is gitignored by design. Fixes here are local-only and should NOT be committed.

Minimum local fix
- Remove terminal.integrated.* overrides from the workspace settings OR set User settings to bash.
- If scripts fail with “python: command not found,” use python3.

Stop condition
If VS Code terminal becomes unstable:
- STOP heavy hydration
- Switch to Hydration Lite
- Force bash in VS Code User settings until stable
