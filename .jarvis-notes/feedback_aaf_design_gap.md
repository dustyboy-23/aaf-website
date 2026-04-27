<!-- freshness: 2026-04-17T00:30:24-07:00 -->
<!-- stale-after: 180d -->
---
name: Design builds need visual verification loop
description: Can't ship visual work from CSS-only reasoning — must verify rendered output before showing Dusty
type: feedback
originSessionId: 58565422-1f82-41bf-9828-db7b0102fe56
---
5 homepage iterations rejected across 3 sessions. Root cause: building visual designs from code without being able to see the rendered result. Each time I thought the CSS would produce something premium, Dusty saw something different.

**Why:** I reason about CSS properties (borders, spacing, colors) but can't predict how they compose into a visual gestalt. "Newspaper grid with hairline borders" sounds editorial but may render as sparse/empty on a dark background.

**How to apply:** For any visual/UI work on AAF or similar sites:
1. Build a section, deploy or serve it, WebFetch the page to check structure
2. But recognize that WebFetch only gives me markdown — I still can't see the visual result
3. Consider using the visual companion tool from superpowers, or screenshot tools
4. Don't tell Dusty it's done until he's seen it and confirmed
5. Smaller iterations — show one section at a time, not a full page rewrite
