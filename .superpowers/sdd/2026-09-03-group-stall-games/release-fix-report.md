# Group stall games release-fix report

## Scope completed

- Replaced free-form select validation with strict allowlisted enums. The newcomer nickname is optional and is intentionally excluded from the model prompt.
- Restored the specified meeting level (`紧急`) and voting invitation.
- Enforced per-game result contracts: every model receipt and local fallback uses the required, ordered section set for its game.
- Added a structured `isFallback` flag. The client renders `本摊临时改由人工印刷` while retaining the normal result, copy text, and image actions.
- Rejected model receipts that echo the supplied nickname, attack a named person, demean a protected trait, spread organizational rumors, or suggest deceptive meeting exits.
- Caught Canvas drawing and share-export failures so the result UI remains available.

## TDD evidence

Focused regression tests were added before the implementation and initially failed for optional nickname handling, strict option enums, `紧急`, the voting prompt, fallback metadata/sections, nickname echoing, unsafe meeting exits, and Canvas drawing failures. The completed focused suite passes.

## Verification

- `npm test -- lib/stalls/group-games.test.ts lib/ai/stalls.test.ts components/market/ServiceDesk.test.tsx components/share/ShareActions.test.tsx` — 30 passed
- `npm run lint` — passed
- `npx tsc --noEmit` — passed
- `npm test` — 63 passed across 20 files

`node_modules.incomplete/` was an existing untracked partial dependency tree that caused the repository-wide lint and typecheck to scan third-party files. It is now ignored alongside `node_modules`; no files in that directory were changed.
