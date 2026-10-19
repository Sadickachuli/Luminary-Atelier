# Prompt 02: Five polish fixes for the Luminary Atelier site

## Context
`BUILD/luminary/` is a finished one-page static site for Luminary Atelier (small gratitude gatherings run by Merley Greenidge). It was built from `CONTENT/luminary/` and `OUTPUTS/design-direction.md`. Read `CLAUDE.md` first: its hard rules still apply (no em dashes anywhere, never edit `ASSETS/`, `CONTENT/` or `CLIENT/`, ask before deleting files, no deploying).

A design review of the round 3 screenshots found that the site reads as a well-made template rather than a quiet luxury brand. Fix **exactly the five things below and nothing else**.

**Out of scope:** no new sections, no reordering sections, no copy changes, no new libraries, no change to the stack (plain HTML, `css/styles.css`, `js/main.js`, `js/motion.js`, vendored GSAP and Lenis). Keep every `[TBC` placeholder visible and greppable. Keep the motion moments as they are, unless a fix below says otherwise.

Where a fix contradicts `OUTPUTS/design-direction.md`, **this prompt wins**. List each override in your final report so the design direction can be updated afterwards. Do not edit the design direction yourself.

Before you start, commit the current state: `git commit -am "Before prompt 02 polish"`.

---

## Fix 1. Every section uses the same formula

**Problem.** Every section is built the same way: a short hairline dash, then a tracked uppercase eyebrow, then a big Bodoni h2, then Jost paragraphs. On top of that, three sections (hero, her story, Celebrate Sweetly) are the same image-beside-text split, and every section has identical vertical padding. The repetition is what makes it read as a template. It also flattens the whitespace: nothing feels more important than anything else.

**Do:**
- Remove the hairline from every eyebrow (the `.eyebrow::before` pseudo-element, including the Philosophy override). Eyebrows stay as text: Jost 500, `0.75rem`, letter-spacing 0.22em, `--stone` on light backgrounds.
- Keep the one hairline above the hero headline. It is now the only freestanding rule on the page, so it means something.
- Vary the vertical rhythm with three section-padding tokens instead of one:
  - `--pad-tight: clamp(72px, 9vw, 128px)` for Celebrate Sweetly and the inquiry form.
  - `--pad-default: clamp(96px, 13vw, 200px)` for Experiences and Her story.
  - `--pad-open: clamp(136px, 18vw, 280px)` for Philosophy only. It is the heart of the page and should feel like the room goes quiet.
- Hero: close the dead band between the button and the dark Philosophy section. Bottom padding should be about 0.6x the top padding.
- Celebrate Sweetly: break the third split. Set the photo larger, about 5 of 12 columns on desktop, aligned to the **top** of the h2 rather than floating. Shift the text block one column further right than Her story's text, so the two splits don't mirror each other.

## Fix 2. Thin, flat type hierarchy

**Problem.** Body copy is Jost 300 in a greyish tone. It looks spindly on screen and reads as low-contrast filler. The hero has three competing text tiers, and the intro line ("I'm Merley...") is the faintest thing on the page, though it is the most human line in the opening. Philosophy runs six centered paragraphs at one identical size, so the frog story has no entry point. Centered multi-line body text is a template habit and is harder to read. Large Bodoni headlines also show uneven spacing: "W hy I listen first" visibly gaps after the W.

**Do:**
- Body text everywhere: Jost **400** (not 300), color `--ink`, size `clamp(1.0625rem, 1.15vw, 1.1875rem)`, line-height 1.7. Keep `--stone` only for captions, form hints and eyebrows.
- Hero: two tiers only. Keep the subline as the lead (Jost 400, current size). Set the intro line at body size in `--ink`, not grey, with `--s-3` above it.
- Philosophy body:
  - Left-align it inside the existing centered column, at a max width of 34em. The eyebrow and headline stay centered.
  - Set the **first paragraph** ("She mentioned it once, almost in passing. She loved tiny frogs.") as a lead in Bodoni Moda 400 italic, `clamp(1.5rem, 2.4vw, 2.125rem)`, line-height 1.35, in ivory. It must still take part in the word-lighting scrub.
  - The remaining paragraphs stay Jost 400 at body size, with 1.1em between them.
- Headlines: make sure `font-optical-sizing: auto` is on and `font-kerning: normal` is set. Check that SplitText is splitting into lines or words only, never characters, for headings (character splitting breaks the kerning pairs, which is the likely cause of "W hy"). If spacing is still uneven, set heading letter-spacing to `0` rather than negative.
- Card names: Bodoni Moda 400 at `clamp(1.375rem, 1.9vw, 1.75rem)`.

## Fix 3. Too many boxed buttons

**Problem.** There are eight boxed, uppercase, tracked buttons on one page: three "Start a conversation", three "Ask about this gathering", "Visit Celebrate Sweetly" and "Send". It makes the page look like a SaaS landing page. Quiet luxury brands ask once and let everything else be a quiet link.

**Do:**
- Keep the filled ink button in exactly two places: the hero "Start a conversation" and the form "Send".
- Turn every other button into a text link:
  - The three card links, the experiences closing "Start a conversation" and "Visit Celebrate Sweetly".
  - Style: Jost 500, `0.8125rem`, uppercase, letter-spacing 0.18em, `--ink`, with a 1px underline in `--walnut` offset 6px.
  - On hover (pointer devices only), the underline turns `--ember` and draws from left to right over `--dur-ui`.
  - Keep a tap target of at least 44px tall with padding, without drawing a box.
- Keep all hrefs, the gathering preselect behavior and the existing labels exactly as they are.

## Fix 4. Photography cropped and placed like stock images

**Problem.**
- **Hero:** the 4:5 crop leaves the lantern small in the lower left and fills the frame with sky. A satellite dish on the roof is clearly visible right of center. The lantern is the point of the image, and the dish breaks the spell.
- **Philosophy:** the horizon sits as a boxed banner (about 720px wide) floating above the eyebrow. It reads like a stock header image.
- **Her story:** the photo is a cool, flash-lit white lobby. Its color temperature fights the warm ivory page.
- **Celebrate Sweetly:** the photo is small, and Merley is tiny in it.

**Do** (work from the originals in `ASSETS/photos/` and write new files into `BUILD/luminary/assets/photos/` under the same names, JPEG plus WebP; never upscale beyond the source pixels):
- **Hero** (`hero-lantern`), from `WhatsApp Image 2026-10-09 at 8.13.56 PM.jpeg`:
  - Recrop to 4:5 so the lantern sits on the left third line, roughly 40% of the frame height, and the satellite dish is fully outside the frame. Cropping tighter is fine.
  - If the dish cannot be excluded while keeping the lantern prominent, crop to 3:4 or 2:3 instead and report which one you used. Do not retouch or paint out the dish.
- **Philosophy** (`philosophy-horizon`), from `WhatsApp Image 2026-10-09 at 6.37.50 PM.jpeg`:
  - Make the band full-bleed, edge to edge with no container, and short: `clamp(120px, 18vh, 220px)` tall with `object-fit: cover` centred on the horizon line.
  - Place it at the very top of the Philosophy section with no gap, so the light reads as part of the dark room, not a picture hung in it. Exclude the plane window entirely.
  - Keep its existing reveal.
- **Her story** (`story-merley-door`), from `WhatsApp Image 2026-10-09 at 8.17.41 PM.jpeg`:
  - Warm the white balance noticeably (about +400K to +600K equivalent) and lift the blacks slightly, so the lobby whites read as warm ivory rather than blue-white.
  - Crop to 4:5, with Merley and the lattice door filling the frame and less empty lobby on the left.
- **Celebrate Sweetly** (`celebrate-doorway`), from `WhatsApp Image 2026-10-09 at 6.37.50 PM (2).jpeg`: crop to 4:5 around the carved door, so Merley is clearly visible in the lower third. This is the highest-resolution file, so use its full height.
- Apply one consistent gentle warm grade to all four, so they look like one set. No CSS filters.
- Update `width`, `height` and alt text if crops change what is visible.

## Fix 5. Decoration that looks like a bug

**Problem.**
- Each experience card has a short walnut segment at its top left that only extends on hover. At rest it looks like a rendering error.
- The `[TBC]` placeholders are thick dashed boxes. In the cards they dominate so heavily that the section looks broken, which will alarm Merley when she sees a preview.
- The ember-colored underline under every link, plus the eyebrow dashes (removed in Fix 1), add up to decoration with no meaning.

**Do:**
- **Card top rule:** full card width at rest, 1px, `--walnut` at 40% opacity. On hover, it becomes `--ember` at full opacity, using a color transition only, over `--dur-ui`. Remove the scaleX hover animation.
- **TBC placeholders:** keep them visible and greppable, but make them read as tidy notes rather than errors.
  - Replace the dashed outline with a light tinted background (`rgba(162, 74, 38, 0.08)`), a 1px dotted bottom border in `--ember`, `padding: 0 0.2em`, and inherited font and size.
  - In the footer, use an ivory dotted border with `rgba(245, 239, 230, 0.12)` as the background.
  - Keep the `/* TBC PLACEHOLDERS: remove before launch */` comment block, and keep every `data-tbc` ID.
- **Inline text links** (email links and footer links): underline in `currentColor` at 40% opacity, 1px, offset 4px, turning to full opacity on hover. Ember is reserved for focus rings, hover states and the TBC notes.

---

## Verify
1. Re-run the screenshot set into `BUILD/luminary/_review/round4/`:
   - 375, 768 and 1280px.
   - With motion, with reduced motion, and with no JavaScript.
   - Three frames of the Philosophy section mid-scroll.
2. Look at every screenshot. Compare against round 3 and confirm all five fixes are visible. Confirm that nothing else changed: same sections, same order, same copy.
3. Run `grep -rn "\[TBC" BUILD/luminary --include=*.html` and confirm the count matches round 3.
4. Run `grep -rnP "\x{2014}" BUILD/luminary` (the em dash, U+2014) and confirm it returns nothing.
5. Confirm contrast still passes WCAG AA, including the Philosophy lead at its 50% starting opacity and the new TBC styling.
6. Check the console for errors and confirm there are none.

## Done looks like
- All five fixes are applied, and nothing outside them has changed.
- One commit: `Prompt 02: five polish fixes`.
- A short report covering:
  - For each fix, what changed (one or two lines each).
  - The crop ratio used for the hero, and whether the dish is fully out.
  - Every point where this prompt overrode `OUTPUTS/design-direction.md`.
  - Anything you could not do.
