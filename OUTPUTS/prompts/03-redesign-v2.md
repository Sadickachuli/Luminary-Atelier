# Prompt 03: Redesign Luminary Atelier around motion (v2)

## Context
`BUILD/luminary/` is a working one-page static site for Luminary Atelier (small gratitude gatherings run by Merley Greenidge, launching 28 October 2026). Its design is being replaced by a motion-led direction.

Read, in this order:
1. `CLAUDE.md`. Hard rules: no em dashes anywhere, never edit `ASSETS/`, `CONTENT/` or `CLIENT/`, ask before deleting files, no deploying.
2. `OUTPUTS/design-direction-v2.md`. **The authority for this task.**
3. `OUTPUTS/design-direction.md`, for the palette, type tokens, logo rules and TBC items that v2 keeps.
4. `CONTENT/luminary/*.md`, the copy. Use it verbatim.
5. `BUILD/luminary/TBC-LIST.md`.

**Prompt 02 is cancelled.** Do not run it. Its useful fixes are folded into v2.

## Goal
Rebuild the layout and motion of `BUILD/luminary/index.html` to match `design-direction-v2.md`.

Keep:
- the stack: plain HTML, `css/styles.css`, vanilla JS, and vendored GSAP, ScrollTrigger, SplitText and Lenis;
- the form, Formspree wiring and gathering preselect;
- the SEO tags and favicons;
- `thank-you.html`, `TBC-LIST.md` and `README.md` (update the last two where needed).

Add no new copy beyond what v2 allows: the brand name, her name, "Los Angeles", index numbers like `[ 01 ]`, the counter, and [TBC] placeholders.

## Rules
- Recreate the techniques described in v2 in our own code. **Do not fetch, copy or inspect the source code of the Framer templates.** Do not use their images, fonts or text.
- Before starting, commit: `git add -A && git commit -m "Before prompt 03 redesign"`.
- Build in this order, and screenshot after each step so problems are caught early:
  1. Base fixes carried from prompt 02: Jost 400 body text, text links instead of extra buttons, the new TBC styling, photo recrops and grading.
  2. Column grid lines, bracket labels and the experiences rows.
  3. The hero with its floating 3D cards.
  4. The filmstrip, including the touch fallback and the reduced-motion grid.
  5. The Philosophy continuation on the dark stage.
  6. Her story's sticky frame. Attempt the cut-out only after everything else works.
  7. The Celebrate Sweetly marquee.
  8. The footer wordmark.
  9. The intro curtain.
- Photos: process them from `ASSETS/photos/` into `BUILD/luminary/assets/photos/` (JPEG plus WebP, never upscaled, one gentle warm grade across the set). Keep every image reference in one place so Merley's originals can be swapped in later. Open each photo before using it and check it against the v2 table.
- Hero lantern crop: the satellite dish must be fully out of frame. Do not retouch it out.
- The Her story cut-out is optional. Ship it only if the edges hold up at display size on a 1280px screen. If not, skip it and report why.
- Keep everything that already works: reduced motion, no-JS readability, accessibility (AA contrast, focus states, labels, skip link, landmarks, keyboard menu) and the form.
- Mobile: no pinned horizontal scroll on touch. Use the swipe-and-snap fallback v2 describes.

## Verify
1. Screenshots into `BUILD/luminary/_review/v2/`:
   - 375, 768 and 1280px;
   - with motion, with reduced motion and with no JS;
   - plus five frames across the filmstrip pin (start, 25%, 50%, 75%, end), two hero frames (rest, and mid-scroll exit), and the intro mid-split.
   Look at every screenshot. Fix the three weakest things and repeat at least twice.
2. Run `grep -rn "\[TBC" BUILD/luminary --include=*.html` and confirm every match is in `TBC-LIST.md`.
3. Run `grep -rnP "\x{2014}" BUILD/luminary` and confirm it returns nothing.
4. Compare the visible text against `CONTENT/luminary/`: every sentence present verbatim, and nothing added beyond what v2 allows.
5. Performance: no layout shift, LCP under 2.5s (Lighthouse mobile, if available), and the filmstrip scrubs smoothly at 1280px. Report the gzipped JS total.
6. No console errors. Confirm the form still works with a mocked fetch.

## Done looks like
- The site matches `design-direction-v2.md`: intro split, hero with floating cards, pinned filmstrip, dark Philosophy continuation, editorial experience rows, sticky her-story frame, marquee and footer wordmark.
- Copy is unchanged, every TBC is still visible, and nothing is deployed.
- One final commit: `Prompt 03: motion-led redesign v2`.
- A short report covering:
  - each section and its motion;
  - which photo went where;
  - whether the cut-out shipped;
  - JS size;
  - anything from v2 you could not do or changed, and why.
