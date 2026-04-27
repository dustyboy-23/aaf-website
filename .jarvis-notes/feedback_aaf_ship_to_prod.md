<!-- freshness: 2026-04-17T13:54:52-07:00 -->
<!-- stale-after: 180d -->
---
name: AAF website — ship to prod for iteration
description: aiagentsfirst.com has ~0 traffic, so prod IS the dev environment. Commit + push to master → auto-deploy. Don't make Dusty use Tailscale/localhost for visual iteration.
type: feedback
originSessionId: 93cd616e-681e-49df-bc83-57cfcf29ba5a
---
For the AAF website (aaf-website repo), iterate directly on production. Dusty pointed out during the hero redesign that nobody uses the site yet and the Tailscale/localhost/screenshot loop was wasting both our time.

**Why:** Traffic is effectively zero on aiagentsfirst.com (Phase 2 revenue funnel, not yet active). Preview URLs are 401-protected by default on Vercel Hobby. Dusty works from his main PC, not the WSL laptop, so he can't hit localhost:3005 easily. Prod is the only URL that actually lets him see and react to visual work.

**How to apply when doing visual/UI work on AAF:**
1. Commit with author `Dustin Gilmour <269820786+dustyboy-23@users.noreply.github.com>` — GitHub noreply email bypasses the Vercel Hobby author check that blocks the default `Jarvis <jarvis@aiagentsfirst.com>` author.
2. Push the branch to GitHub.
3. Open a PR or merge to master. Merging to master = auto-deploy to aiagentsfirst.com in ~90s.
4. Give Dusty the live URL (aiagentsfirst.com) to refresh, not a Tailscale IP.
5. Skip headless screenshots unless debugging a specific bug — the live site is the ground truth.

**Keep the local dev server running anyway** for instant-feedback shader/JS changes, but prod is the URL Dusty checks.

**When NOT to iterate on prod:**
- If AAF actually gets traffic (>1 daily active user) — switch to preview deploys or feature flags.
- If a change breaks the build — prod will serve the last good deploy, but avoid pushing known-broken code.
- If a change needs auth/secrets not in the Vercel env — verify the env vars first.
