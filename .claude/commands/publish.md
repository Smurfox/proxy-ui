---
description: Release a new version to npm — bump on develop, merge to main, tag, build, publish.
argument-hint: ""
---

# Publish to npm

Run the full release flow for `@smurfox/proxy-ui`. This is a destructive, externally-visible flow (git push, npm publish) — be deliberate, abort on any failure, and never try to "rescue" with extra commands.

## Preconditions

Check all of these BEFORE doing anything else. If any fails, abort with a clear message and do not modify any state.

1. **Clean working tree.** Run `git status --porcelain`. If output is non-empty, abort: tell the user to commit or stash first.
2. **On `develop` branch.** Run `git branch --show-current`. If not `develop`, abort: tell the user the publish flow starts from `develop`.
3. **Develop is in sync with origin.** Run `git fetch origin develop` then `git rev-list --left-right --count develop...origin/develop`. If develop is behind or has diverged, abort and ask the user to reconcile.

## Pre-flight: README check

Before asking for the bump, verify the README documents every user-facing change since the last release. This is the step that's easy to forget and that ships incomplete docs to npm.

1. Find the last release tag: `git describe --tags --abbrev=0 --match 'v*'`. Store as `$LAST_TAG`.
2. List commits since that tag: `git log $LAST_TAG..HEAD --oneline`.
3. From that list, flag commits whose subject suggests **user-visible** changes:
   - `feat(...)` / `feat:` — almost always needs README coverage (new component, new prop, new slot, new event).
   - `fix(...)` / `fix:` — only if it changes documented behavior or default values.
   - Anything that adds or renames a public prop, slot, event, or component.
   - Ignore: `chore:`, `docs:`, `refactor:`, `test:`, `style:`, and internal-only fixes.
4. For each flagged commit, open the relevant component file(s) and confirm the README in this repo describes the new prop/slot/event/default. If the README is missing **anything** that a consumer would need to know, list those gaps for the user.
5. Use `AskUserQuestion` to confirm before continuing. Phrase it like: "I found N user-facing commits since $LAST_TAG. The README covers X but appears to be missing: [Y, Z]. Continue anyway, or pause so you can update the README first?"
   - **Pause** → abort the publish flow with a one-line message ("Paused — update README, commit, push, then re-run /publish"). Do **not** auto-write the README; the user should review and word the docs.
   - **Continue** → proceed to step 1.
6. If you find no flagged commits (e.g., the release is purely chores/docs/fixes with no API surface changes), skip the question and continue silently to step 1.

Do not perform this check by trusting commit messages alone — open the actual code diff for any flagged commit (`git show <sha> -- src/runtime/`) so you can see the real change, not just what the commit message claimed.

## Steps

### 1. Ask the bump type

Read the current version from `package.json`. Use `AskUserQuestion` to ask which bump to apply, showing what each produces. For example, if current is `0.1.35`:

- Patch → `0.1.36`
- Minor → `0.2.0`
- Major → `1.0.0`

Store the user's choice as `$BUMP`.

### 2. Pre-checks

Run sequentially, abort on the first failure (do not run subsequent steps if one fails):

- `npm run lint`
- `npm run test`

If either fails, stop and report which check failed. Nothing has been changed yet, so no cleanup is needed.

### 3. Bump version (no git tag)

```
npm version $BUMP --no-git-tag-version
```

Read the new version from `package.json`. Store as `$VERSION` (without the `v` prefix). Confirm to the user: "Bumped to vX.Y.Z, continuing…"

### 4. Commit and push develop

```
git add package.json package-lock.json
git commit -m "chore: release v$VERSION"
git push origin develop
```

### 5. Merge develop → main, tag, push

```
git checkout main
git pull origin main
git merge --no-ff develop -m "chore: release v$VERSION"
git tag v$VERSION
git push origin main --follow-tags
```

If the merge has conflicts, **stop**. Leave the user on `main` with the conflict and tell them to resolve manually — do not abort the merge automatically, do not try to continue.

### 6. Build the distributable

```
npm run prepack
```

If it fails, stop and report. Tell the user: the version commit and tag are already pushed, so they may want to either fix the build and re-run from step 6, or revert the tag with `git push --delete origin v$VERSION`.

### 7. Publish to npm

```
npm publish
```

If it fails (auth, network, conflict), stop and report. The git side is already done — the user can retry just `npm publish` once the issue is fixed.

### 8. Return to develop and sync

```
git checkout develop
git merge --ff-only main
git push origin develop
```

This brings the merge commit and tag back to `develop` so the branches stay aligned for the next release.

### 9. Report

Print:

- New version: `vX.Y.Z`
- npm: `https://www.npmjs.com/package/@smurfox/proxy-ui/v/X.Y.Z`
- GitHub release tag: `https://github.com/Smurfox/proxy-ui/releases/tag/vX.Y.Z`

## Rules

- **Never** use `--no-verify` to skip git hooks or `--force` for any git command.
- **Never** amend or rewrite published commits.
- If anything fails mid-flow, report the failing step and current state — do not run extra commands to try to recover unless the user asks.
- Run each `Bash` step as a separate tool call so the user can see and approve destructive actions individually.
