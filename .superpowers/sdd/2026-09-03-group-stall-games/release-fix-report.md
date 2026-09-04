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

## Re-review round 2

- Group-game results are now selected exclusively from locally curated, immutable result variants. `generateGroupGameResult` no longer calls the model, so no model text can reach group-game title, summary, or section output.
- Nickname and `smallTask` remain accepted as form inputs but never contribute to displayed text. Only the safe enum/theme inputs select among curated variants.
- Newcomer curated results and the local fallback now put exactly three numbered rules in the `隐藏条例` section.
- Added regressions proving a hostile mocked model response is ignored, arbitrary nickname/small-task text never appears in returned UI data, and both generated and fallback newcomer results contain three discrete hidden rules.

### Re-verification

- `npm run lint` — passed
- `npx tsc --noEmit` — passed
- `npm test` — 52 passed across 20 files

## Final review

- Replaced the curated-result hash with explicit selector mappings: five newcomer department handbooks; four meeting scenarios paired with all three exit levels; and five work-type contexts.
- `smallTask` is classified locally into organize, communicate, repair, coordinate, or default. It changes the award title, citation, metric, and committee comment without ever becoming visible text.
- Every meeting type and level now maps to a distinct safe scenario/action receipt, including separate `紧急` and `荒诞` behavior.
- Added generated-result contract coverage for every department, all 12 meeting combinations, all five task categories, and every work type. The tests assert ordered labels, templates, newcomer-only three-rule output, and distinct curated outputs.
- Invalid selector values are still rejected by the strict server-side input schemas; the local result factory also returns its curated fallback for an invalid direct invocation rather than exposing an input value.

### Final verification

- `npm run lint` — passed
- `npx tsc --noEmit` — passed
- `npm test` — 57 passed across 20 files
