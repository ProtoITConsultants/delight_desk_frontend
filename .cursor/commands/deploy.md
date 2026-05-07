# Deploy

When the user writes `deploy`, `deploy changes`, `/deploy`, `commit and deploy`, or asks to deploy the current frontend changes, treat it as an explicit request to:

1. Review `git status` to see all changed and untracked files.
2. Review `git diff` to understand the changes.
3. Review recent commit messages with `git log --oneline -5` and follow the repo's commit style.
4. Stage only relevant project changes. Do not stage secrets, `.env` files, credentials, or unrelated user changes unless explicitly requested.
5. Create a clear conventional commit message, for example:
   - `feat(users): include fulfillment partners in connections response`
   - `fix(agents): handle missing fulfillment config`
   - `docs(api): document connections response`
6. Commit the staged changes.
7. Push the current branch to its tracked remote.
8. **MANDATORY: Ensure the GitHub pull request matches the branch** — create a new PR if none exists, or **refresh title and body** on the existing PR after every push (see below). Do not leave a stale description.
9. Report the commit hash, branch, push result, and PR URL to the user.

### PR step (Step 8) — REQUIRED: create **or** update

**After every successful push, end with exactly one open PR into `staging` for the current branch**, with an up-to-date title and description. Do not skip unless the user explicitly says `skip PR` or `no PR`.

**Why "update" matters:** GitHub **does not** open a second PR when you push more commits to the same branch — it **updates the same PR**. If you only run `gh pr create`, it fails with "a pull request already exists" and the **description stays old**. Always regenerate the PR body after push and apply it via **create or edit**.

**GitHub constraint:** Only **one open PR** can exist per `head` branch → `base` branch pair. You cannot stack multiple open PRs from `dev/nabeel` → `staging` without closing the previous one first.

#### Workflow (always follow this order)

1. Run `gh auth status` if needed; install/login per [GitHub CLI](https://cli.github.com/) if missing.
2. Run `git fetch origin staging` (and `git fetch origin` if needed) so `git log origin/staging..HEAD` is accurate.
3. **Write `/tmp/pr-body.md`** — summarize **everything on the branch** not yet merged into `staging`, not only the latest commit:
   - **Summary**: What changed and why across **all** commits in `origin/staging..HEAD` (or the full diff if that is clearer).
   - **Changes**: Files touched and purpose; group by feature/area if the branch has multiple themes.
   - **Testing checklist**: Items that cover the full change set.
   - **`### Commits`**: paste output of `git log origin/staging..HEAD --oneline`.
   - **Notes / Rollback** as appropriate.
4. **Title**:
   - Default: `git log -1 --pretty=%s` (latest commit).
   - If the branch mixes unrelated work (e.g. dashboard + approval queue), prefer a **compound title** that reflects the whole PR, or the most important theme plus "and …" — never leave the title describing only old work when newer commits materially change scope.
5. **Open or refresh the PR** (use a single title variable, e.g. `TITLE="$(git log -1 --pretty=%s)"` or a hand-written compound title when the branch mixes areas):
   ```bash
   PR_NUM=$(gh pr list --base staging --head "$(git branch --show-current)" --state open --json number --jq '.[0].number // empty')
   if [ -n "$PR_NUM" ]; then
     gh pr edit "$PR_NUM" --title "$TITLE" --body-file /tmp/pr-body.md
   else
     gh pr create --base staging --head "$(git branch --show-current)" --title "$TITLE" --body-file /tmp/pr-body.md
   fi
   ```
   If `gh pr create` fails because a PR already exists (race or branch rename), run **`gh pr edit`** with the same `--title` and `--body-file` — do not stop at the error.

**Optional — user wants a "new PR" number:** They must **close** the existing PR first (`gh pr close <NUMBER>`), then `gh pr create` again from the same branch. Only do this if the user explicitly asks; refreshing title/body is the normal fix for stale descriptions.

**Context:** Next.js frontend; Vercel preview deployments attach to the PR after push.

- **ALWAYS report the PR URL** (and whether it was **created** or **updated**) at the end.

### Output Format

At the end of /deploy, present a clear summary:

```
## Deploy Complete

| Step | Status |
|------|--------|
| Commit | ✅ `abc1234` - commit message |
| Push | ✅ Pushed to `origin/dev/nabeel` |
| PR | ✅ **PR #XX** created or ✅ **PR #XX** description/title refreshed |

**PR URL:** https://github.com/.../pull/XX
```

Important safety rules:

- Do not run destructive git commands.
- Do not force push unless the user explicitly says to force push.
- If there are unrelated changes or possible secrets, stop and ask before committing them.
- If there are no changes, tell the user instead of creating an empty commit.
- **Always have an accurate open PR into `staging`** (create once, then **`gh pr edit`** on every subsequent deploy push) unless explicitly instructed otherwise.
