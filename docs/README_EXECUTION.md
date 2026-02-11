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
