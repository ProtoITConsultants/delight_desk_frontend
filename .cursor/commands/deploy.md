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
8. **MANDATORY: Create a GitHub pull request** - This is a required step.
9. Report the commit hash, branch, push result, and PR URL to the user.

### PR Creation (Step 8) - REQUIRED

**ALWAYS create a PR after successful push. Do not skip unless the user explicitly says "skip PR" or "no PR".**

- **Target branch**: **`staging`** (this repo's workflow: feature branches → `staging`).
- **Source branch**: `dev/nabeel` (your feature branch - all commits and pushes go here).
- **Frontend context**: This is a Next.js frontend project. After PR creation, Vercel preview deployments will appear automatically in the PR.
- **Tooling**: use the **GitHub CLI** (`gh`). Run `gh auth status`; if missing or not logged in, tell the user once how to fix it (install from [GitHub CLI](https://cli.github.com/), then `gh auth login`).
- **`git fetch origin`** first if `origin/staging` might be stale (needed for accurate commit lists).
- **Generate PR body** with:
  - **Title**: Use the latest commit subject: `git log -1 --pretty=%s`
  - **Summary section**: Brief description of what changed and why
  - **Changes section**: List of modified files and what they do
  - **Testing checklist**: Mark items that apply
  - **### Commits** section: `git log origin/staging..HEAD --oneline`
  - **Notes/Rollback**: Any additional context or instructions to revert

- **Create PR command**:
  ```bash
  gh pr create --base staging --head "$(git branch --show-current)" --title "$(git log -1 --pretty=%s)" --body-file /tmp/pr-body.md
  ```

- **ALWAYS report the PR URL** to the user at the end.

### Output Format

At the end of /deploy, present a clear summary:

```
## Deploy Complete

| Step | Status |
|------|--------|
| Commit | ✅ `abc1234` - commit message |
| Push | ✅ Pushed to `origin/dev/nabeel` |
| PR | ✅ **PR #XX** created |

**PR URL:** https://github.com/.../pull/XX
```

Important safety rules:

- Do not run destructive git commands.
- Do not force push unless the user explicitly says to force push.
- If there are unrelated changes or possible secrets, stop and ask before committing them.
- If there are no changes, tell the user instead of creating an empty commit.
- **ALWAYS create a PR** unless explicitly instructed otherwise.
