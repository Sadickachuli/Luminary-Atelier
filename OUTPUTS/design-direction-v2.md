# Luminary Atelier: Design direction v2 (motion-led)

Replaces the **Layout**, **Imagery** and **Motion** sections of `design-direction.md`. The palette, typography tokens, contrast figures, logo rules and TBC items in `design-direction.md` still apply, except where this file overrides them.

## Decisions after plan review (20 October 2026), these override anything below

1. Build on prompt 02's commit (`0f46826`). Do not revert it.
2. No `mix-blend-mode: difference` anywhere: it turns ivory blue-teal over her warm photos. The filmstrip overlay is plain ivory. The header swaps colours with a class over dark sections.
3. The filmstrip has **7 frames** (photos 2, 3, 1, 7, 9, 14, 4) and the counter reads "01 / 07". Photos 5 and 13 are out, because they show identifiable strangers or companions. This holds unless Merley confirms otherwise.
4. Marquee thumbnails are tight detail crops (the door carving, the lantern pattern, the robe embroidery), not repeats of whole photos.
5. Fonts are self-hosted: Bodoni Moda and Jost, both under the SIL Open Font License. Preload the display font. No Google Fonts request.
6. The Her story cut-out is deferred until her original photos arrive. Do not install `rembg`.
7. Keep these quiet v1 motions: the heading line rise, the eyebrow fade, the header hiding on scroll down and the active-section nav underline. Drop the v1 photo wipe reveals.
8. Grid lines sit at the container's left edge, column 4, column 8 and the right edge.
9. Section labels keep brackets (`[ 02 ] Signature Experiences`). Experience rows use plain numerals without brackets ("01", "02", "03"), so the two numbering systems don't collide.
10. The Her story frame is capped at 720px wide on very large screens, so it isn't stretched past the photo's resolution.
11. No paper grain.
12. Decorative duplicates (hero cards, marquee repeats, footer wordmark) get `aria-hidden="true"`.

## Why v2

v1 was correct but timid: one split layout repeated, boxed cards and small photos beside text. v2 is built around **motion and imagery**, borrowing structure and motion ideas from six Framer templates Sadick picked (Filmstrip, Mondragon 1, Mondragon 4, Nika Stern, Foldfolio, Storm Lab), translated into Merley's palette and voice.

**Legal line:** these are Framer templates under a limited community licence. We recreate **techniques and layout patterns** in our own code. We copy no code, assets, images, fonts or text from them.

## What we take from each template

| Template | What it does (seen live) | What we take | What we leave |
|---|---|---|---|
| **Filmstrip** | Pinned black stage; portrait photos slide horizontally across it as you scroll; big name and text stay fixed on top, inverting over the images. | **The signature section.** A pinned dark "filmstrip" of her photos, with "Luminary Atelier" fixed on top in `mix-blend-mode: difference` and a frame counter. Portrait frames suit her portrait phone photos, and the small frame size hides their low resolution. | Its typeface and layout chrome. |
| **Mondragon 4** | Floating, tilted photo cards cascading in 3D around giant type; a paragraph that darkens word by word as you scroll; a marquee with small images between words. | **Hero:** tilted photo cards floating in CSS 3D around the giant tagline. **Celebrate Sweetly:** a slow marquee with a small photo between repeats. The word-by-word reveal is already our Philosophy moment. | Agency stats, tech tags, the "available for hire" chrome. |
| **Nika Stern** | Visible column grid lines; bracketed index labels like "[ 01 ] Approach"; huge full-bleed image frames with small caption chips; scroll-scrubbed statement text. | Faint **column grid lines** on light sections, **bracketed index labels** for section labels and experiences, and **caption chips** on large images. | The red, the CRT scanlines, the custom cursor. |
| **Mondragon 1** | A 3D twisting ribbon of image cards across the hero; giant condensed type; text scramble. | **Phase 2, after launch:** a WebGL "satin ribbon" of her photos twisting through the hero. It ties to the satin ribbon in her gifting story. Not in this build. | The text scramble (reads as tech), the agency layout. |
| **Foldfolio** | Opens with the page splitting along a fold line as the name rises; a phone that unfolds on scroll. | **The intro only:** an ivory curtain splits horizontally along a hairline and the monogram rises. | The phone device, which is a gimmick and wrong for her. |
| **Storm Lab** | A cut-out figure standing in front of giant type, for depth; an interactive rain simulation; vivid orange. | **Optional:** giant text behind a cut-out of Merley in "Her story", only if a clean cut-out is possible from her photos (see Her story). | The rain, the orange, the product spec chrome. |

## Page structure (copy order unchanged)

All copy comes verbatim from `CONTENT/luminary/`. New elements use only the brand name, her name, "Los Angeles", index numbers and [TBC] placeholders. No invented text.

0. **Intro (once per session).** Full ivory screen with a 1px walnut hairline across the middle. The hairline draws from the center outwards (500ms). The screen then splits along it, the top half sliding up and the bottom half down (900ms, `--ease-inout`). Behind it, the hero is already in place, and the monogram rises 16px into the header. Total under 1.8s. Skipped on repeat visits and with reduced motion.

1. **Header.** Monogram plus the "LUMINARY ATELIER" text, nav on the right. Over dark sections, it inverts using `mix-blend-mode: difference` or a class switch.

2. **Hero (Mondragon 4).** Full viewport, ivory.
   - The tagline is set huge, Bodoni Moda 400 at `clamp(3.5rem, 11vw, 11rem)`, line-height 0.95, across two or three lines. "Gathering" sits in italic.
   - Five portrait photo cards (about 14 to 18vw wide) float in CSS 3D (`perspective: 1400px`) around and partly behind the type. Each has its own slight rotation (rotateY ±18deg, rotateZ ±6deg) and depth.
   - They drift gently with the pointer (max 12px, smoothed) and on scroll they spread apart and move towards the viewer as the hero leaves.
   - Subline, intro line and the one filled button sit bottom-left, within the column grid.
   - On mobile: three cards, no pointer drift, smaller.

3. **Filmstrip (new, imagery only).** Dark (`--night`) stage, pinned for about 250vh of scroll.
   - A horizontal strip of 8 portrait frames (aspect 3:4, height about 62vh, gap 3vw) moves right to left as you scroll (scrubbed).
   - Fixed over the stage: "Luminary Atelier" in Bodoni Moda at about 12vw, ivory, `mix-blend-mode: difference`, plus a small counter bottom-right in Jost ("01 / 08") that updates as each frame crosses the center.
   - The frame nearest the center scales from 0.92 to 1 and is fully opaque; others sit at 0.6 opacity.
   - A very slight skew based on scroll velocity (max 3deg), easing back to 0.
   - On touch devices: no pinning. Use a native horizontal swipe row with `scroll-snap-type: x mandatory`, and keep the overlay.
   - With reduced motion: a static grid of the photos.

4. **Philosophy.** Continues seamlessly on the same dark stage, with no seam between it and the filmstrip.
   - The horizon band (full-bleed, short) marks the transition.
   - Keep the italic headline, the lead first paragraph and the word-by-word lighting (50% to 100%).
   - The section label becomes a bracketed index: `[ 01 ] Philosophy`.

5. **Experiences (Nika Stern).** Ivory, with faint column grid lines (four vertical 1px lines in `--walnut` at 8% opacity, aligned to the 12-column grid).
   - The three experiences become **editorial rows**, not boxes. Each row is separated by a 1px rule and holds:
     - a large bracketed index `[ 01 ]`;
     - the name (Bodoni, `clamp(1.75rem, 3.2vw, 3rem)`);
     - the details in a two-column block;
     - a text link, "Ask about this gathering".
   - On hover (pointer devices), the row's index turns `--ember` and the name shifts 10px right (220ms).
   - Rows reveal one by one: the rule draws left to right, then the content fades up.
   - The section label becomes `[ 02 ] Signature Experiences`. The intro and closing line stay.

6. **Her story (Nika Stern + optional Storm Lab).** Desktop layout:
   - The left half of the viewport is a full-height sticky photo frame (100vh, edge to edge on the left), with a caption chip bottom-left: "Merley Greenidge · Los Angeles".
   - The text scrolls on the right.
   - The label becomes `[ 03 ] About Merley`.
   - **Optional depth effect (Storm Lab):** only if a clean cut-out of Merley can be made from one of her photos at good quality. If so, place the headline "Why I listen first" huge behind the cut-out, so she stands in front of the type. If the cut-out edges look rough at display size, skip it and say so. Do not ship a bad cut-out.

7. **Celebrate Sweetly (Mondragon 4).**
   - A full-width marquee band on `--linen`: "Celebrate Sweetly" repeated in Bodoni italic at about 7vw, with a small rounded-corner (2px) photo between repeats.
   - It drifts slowly left (about 40px a second), speeding up slightly with scroll velocity and settling back.
   - Below it sit the section's copy and the "Visit Celebrate Sweetly" text link.
   - The marquee pauses on hover and stops entirely with reduced motion.
   - The label becomes `[ 04 ] Celebrate Sweetly`.

8. **Inquiry.** Keep the form as built. Add the column grid lines. The label becomes `[ 05 ] Get in touch`.

9. **Footer (Mondragon).** Keep the contents, and add the brand name "Luminary Atelier" set full width at the very bottom (Bodoni, sized to span the container, ivory at 12% opacity on walnut). It rises into place as the page ends.

## Photos

The source files are compressed WhatsApp copies, but all frames in v2 are small or medium, which suits them. When Merley sends originals and videos, they swap in without layout changes. Keep every image path in one list in `js/gallery.js` or in clearly marked HTML, so swapping is trivial.

| Use | Photos (contact sheet numbers, see `OUTPUTS/photo-contact-sheet.jpg`) |
|---|---|
| Hero floating cards (5) | 7 (lantern), 2 (carved door), 3 (garden), 9 (lattice door), 14 (desert, orange robe) |
| Filmstrip (8) | 2, 3, 1 (mural), 5 (street, hat), 7, 9, 14, 13 (camels at night, if it holds up at frame size; otherwise 4) |
| Philosophy band | 4 (horizon) |
| Her story frame | 9, or 3 if it crops better to a full-height frame |
| Marquee thumbnails | 2, 7, 14 |

Still excluded: 8 (alcohol, given the recovery story on the page), 10 (restaurant branding on the plate) and the Paris photos 6, 11 and 12 (off message).

Videos: when her originals arrive, short muted looping clips can replace up to two filmstrip frames (`muted playsinline loop`, played only while in view, a poster image, and no playback with reduced motion). This overrides v1's no-video rule for the filmstrip only.

## Motion rules (override v1's "Never" list where noted)

- **Libraries:** keep GSAP, ScrollTrigger, SplitText and Lenis. No WebGL in this build. The Phase 2 ribbon will add OGL or three.js later.
- **Now allowed:** pinned sections (filmstrip only), CSS 3D transforms (hero cards), pointer-reactive drift (hero only), velocity skew (filmstrip and marquee only), a marquee (Celebrate Sweetly only), and a static paper grain overlay at 3% opacity or less (never animated).
- **Still banned:** bounce or elastic easing, text scramble, custom cursors, glow, particles, gradient blobs, scroll speed hijacking, and autoplaying sound.
- **Easing and duration tokens** stay as in v1.
- **Reduced motion:** no intro, no pinning, no 3D drift, no skew, no marquee movement, and no Lenis. Everything stays readable in its final state.
- **Performance:** LCP under 2.5s on a mid-range phone, no layout shift, 60fps on the filmstrip scrub at 1280px. Transforms and opacity only. JS budget of 110KB gzipped.

## Kept from the prompt 02 review (apply in v2)

- Body text in Jost 400 in `--ink`, not 300 grey.
- Only two filled buttons (hero and form). Everything else is a text link.
- TBC placeholders as tinted text with a dotted underline, not dashed boxes.
- The hero lantern crop must exclude the satellite dish.
- Warm the cool lobby photo (9).
