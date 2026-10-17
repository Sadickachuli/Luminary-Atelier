# Luminary Atelier: Design direction

The authority for palette, typography, spacing, imagery and motion on theluminaryatelier.com. Copy lives in `CONTENT/luminary/` and is not changed here.

## The idea in one line

**Light arriving in a quiet room.** "Luminary" means giving off light and guiding others. The site should feel like walking into a calm, warm space where a lamp is being lit: ivory paper, black ink from the logo, walnut and ember from her Morocco photos, and motion that reveals things slowly, the way a room comes into focus.

Her own rule applies to the design as much as the words: solid satin, not bright print. One beautiful detail beats ten effects.

## What we have to work with

- **Logo** (`ASSETS/logos/luminary atelier.png`): 500 x 500 PNG on a white background, not transparent. A high-contrast Didone "LA" monogram with a fine swash, a thin rule beneath, and "LUMINARY ATELIER" in a narrow uppercase sans. Black on white only.
- **Photos** (`ASSETS/photos/`, 14 images plus one video): WhatsApp copies, so compressed and no wider than 2000px. Most show Merley herself in Marrakech and Paris. None shows a gathering. A contact sheet is in `OUTPUTS/photo-contact-sheet.jpg` (numbers below refer to it).

## Palette

Pulled from the logo (ink) and the photos (carved walnut doors, her terracotta and rust clothing, the brass lantern at sunset, the night sky over the desert). No teal anywhere.

| Token | Hex | Use |
|---|---|---|
| `--ivory` | `#F5EFE6` | Page background. Warm paper, never pure white. |
| `--linen` | `#EAE1D3` | Alternate section background, card fill. |
| `--ink` | `#16130F` | Headlines, body text, logo. |
| `--stone` | `#6E655B` | Secondary text, captions, form hints. |
| `--walnut` | `#5A3E2B` | Rules, borders, hover states, footer background. |
| `--ember` | `#A24A26` | The one accent. Links, the active nav line, focus rings, TBC outlines. Use sparingly. |
| `--night` | `#12141C` | The single dark section (Philosophy). |
| `--amber` | `#D69A4A` | Only on `--night`: the "lit" state of words in the Philosophy scroll effect. |

Contrast (WCAG): ink on ivory 16.2, walnut on ivory 8.5, ember on ivory 5.2, stone on ivory 5.0, ivory on night 16.1, amber on night 7.5, ember on linen 4.6. All pass AA for body text.

Ratio of use, roughly: 80% ivory and linen, 15% ink and walnut, 5% ember, amber and night together.

## Typography

Two families from Google Fonts. These approximate the logo. **[TBC: confirm fonts with whoever designed the logo]** and swap if they name the originals.

- **Display: Bodoni Moda** (variable, optical sizes). Matches the high-contrast Didone monogram. Weights 400 and 500, plus 400 italic.
- **Text and labels: Jost** (300, 400, 500). Clean and geometric, close in spirit to the wordmark.

| Role | Font | Size (fluid) | Line height | Notes |
|---|---|---|---|---|
| Hero headline (h1) | Bodoni Moda 400 | `clamp(3rem, 7.2vw, 6.75rem)` | 1.0 | Letter-spacing -0.01em |
| Section headline (h2) | Bodoni Moda 400 | `clamp(2.25rem, 4.6vw, 4.25rem)` | 1.05 | |
| Philosophy headline | Bodoni Moda 400 italic | same as h2 | 1.05 | The one italic headline |
| Card name (h3) | Bodoni Moda 500 | `clamp(1.5rem, 2.2vw, 2rem)` | 1.15 | |
| Body | Jost 300 | `clamp(1.0625rem, 1.2vw, 1.1875rem)` | 1.7 | Max 64ch |
| Lead / intro line | Jost 300 | `clamp(1.25rem, 1.8vw, 1.5rem)` | 1.55 | |
| Eyebrow, nav, buttons | Jost 500 uppercase | `0.75rem` to `0.8125rem` | 1.2 | Letter-spacing 0.22em, echoing the wordmark |

Use `font-display: swap`, preconnect to Google Fonts, and load only the weights above.

## Layout and spacing

- 8px base unit. Tokens: `--s-1` 8, `--s-2` 16, `--s-3` 24, `--s-4` 40, `--s-5` 64, `--s-6` 104, `--s-7` 168.
- Section padding: `clamp(96px, 13vw, 200px)` top and bottom. Generous white space is the luxury signal; do not tighten it to fit more in.
- Content max width 1240px; text columns max 640px. 12-column grid on desktop, 6 on tablet, 4 on mobile, gutters 24px.
- Thin rules (1px, `--walnut` at 40% opacity) echo the line under the logo. Use them between header and content, above eyebrows and in the footer. No boxes with heavy shadows, no rounded "app" cards. Corner radius 0 to 2px.

### Section by section

1. **Header**: small logo left (about 56px tall on desktop, 44px on mobile), nav right in Jost uppercase. Transparent over the hero; once scrolled, ivory at 92% with a hairline bottom rule. Hides on scroll down, returns on scroll up.
2. **Opening (hero)**: split layout, not full-bleed (the photos are portrait and too small to stretch edge to edge). Left 6 columns: eyebrow-sized logo rule, the tagline as h1, the subline, the intro line, the button. Right 5 columns: photo 7 in a tall 4:5 frame. On mobile, the photo comes first at 4:5, text below.
3. **Philosophy**: the only dark section, on `--night`. Centered text column. Italic headline "Someone was listening." Photo 4 (the horizon at first light) sits as a narrow band above the headline or as a very dark background at 25% opacity behind it, never under body text. This is where the signature motion happens (see Motion).
4. **Signature Experiences**: ivory. Intro on the left, then three cards in a row (stacked on mobile) on `--linen`, each with a fine walnut top rule, name in Bodoni, details in Jost. TBC fields stay visible. The closing line and button sit centered beneath.
5. **Her story**: two columns on desktop. Photo 9 (Merley at the carved lattice door) in a 3:4 frame that stays sticky while the text scrolls past it. On mobile the photo sits above the text and is not sticky.
6. **Celebrate Sweetly link**: `--linen`. Photo 2 (the carved wooden doorway) small and to one side, a doorway to the other brand. Short text, one button.
7. **Inquiry**: ivory. A single calm column. Fields are underlines only (1px walnut), labels in Jost uppercase above. The button is ink with ivory text, square corners.
8. **Footer**: `--walnut` background, ivory text, the logo inverted (see Logo), tagline, email, socials (TBC), Celebrate Sweetly link, copyright.

## Imagery

Photo choices, from the contact sheet:

| # | File | Where | Why |
|---|---|---|---|
| 7 | `WhatsApp Image 2026-10-09 at 8.13.56 PM.jpeg` | Hero | A brass lantern glowing at sunset. "Luminary" in one image, and no one has to explain it. |
| 4 | `WhatsApp Image 2026-10-09 at 6.37.50 PM.jpeg` | Philosophy | The horizon at first light from a plane window. Light arriving, on the dark section. |
| 9 | `WhatsApp Image 2026-10-09 at 8.17.41 PM.jpeg` | Her story | Merley at a walnut lattice door. Calm, warm palette, she is clearly visible. |
| 2 | `WhatsApp Image 2026-10-09 at 6.37.50 PM (2).jpeg` | Celebrate Sweetly | A carved doorway and tilework. Handmade detail, and a doorway to the other brand. Highest-resolution photo. |

Do not use:
- 8 (cocktail under magenta light): off palette, and the site tells a story about alcohol given to someone in recovery.
- 10 (plate of food): a restaurant's name is printed on the plate.
- 6, 11, 12 (Paris, Eiffel Tower): off message for a Los Angeles gatherings brand, and a cliché.
- 13 (camels at night): too dark and soft at this size.
- The MP4: no autoplay video.

Treatment:
- Gently warm the photos so they sit together: slightly lift shadows, warm the white balance, and avoid heavy filters. Do it in the image files, not with CSS filters.
- Square corners. No drop shadows, no rounded frames, no duotones.
- **Ask Merley for the original photos from her phone.** WhatsApp compressed these. The hero frame will look soft on large screens until we have originals. Logged as TBC `photo-originals`.
- A proper portrait of her, ideally hosting or in a warm interior, would still be stronger for "Her story" than a travel photo. Logged as TBC `headshot-preferred`, but photo 9 works for launch.

## Logo use

- The PNG has a white background. On ivory, show it with `mix-blend-mode: multiply` so the white disappears. On the walnut footer, use a derived copy with the white made transparent and the black inverted to ivory. Do not redraw, recolor beyond that, or alter the artwork.
- Ask for a vector (SVG) version from the logo designer. Logged as TBC `logo-vector`. With an SVG, the swash can be drawn on in the intro (see Motion). Without one, it fades.
- Favicon: the "LA" monogram cropped from the PNG, ink on ivory.

## Motion

Sadick wants motion that feels expensive. Merley's brand wants restraint. Both are satisfied by **slow, deliberate, few**: a handful of considered moments, done perfectly, rather than everything moving.

### Reference, what to take and what to leave

These Framer templates were offered as inspiration. They are Framer-only remixes under a limited community license, so we take ideas, not code or assets. I could read their listings but not watch their live motion, so check the previews yourself before relying on any of this.

- **Filmstrip** (closest fit): "a cinematic feel without distracting from the images." Take the pacing: slow image reveals, the image always the hero.
- **Nika Stern**: take the text reveals. Leave the red, the custom cursor, the grain effects and the click notes.
- **Foldfolio**: take the restrained text and image reveals. Leave the phone device. It is a gimmick for a portfolio, and wrong for her.
- **Storm Lab**: leave it. Vivid orange, oversized type and a rain simulation are the "bright print" she avoids.
- **Mondragon / Mondragon 4**: the listings only say "studio aesthetic" and "crisp typography". Nothing specific to take without seeing the live preview.

### Libraries

GSAP 3 core with ScrollTrigger and SplitText (all free since 2025), plus Lenis for smooth scrolling. Download pinned versions into `js/vendor/` and load them locally. Do not hot-link a CDN. Everything else is CSS.

### Tokens

```
--ease-out:   cubic-bezier(0.22, 1, 0.36, 1)    /* reveals: fast start, long soft landing */
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1)    /* image wipes, header show/hide */
--dur-ui:     220ms                             /* hover, focus, buttons */
--dur-reveal: 1100ms                            /* text and image reveals */
--dur-image:  1400ms                            /* image wipe and settle */
--stagger:    90ms                              /* between lines or cards */
```

Reveals trigger once, when the element is 15% into the viewport, and never replay on scroll back up.

### The moments (only these)

1. **Opening, once per visit.** The screen starts ivory. The logo monogram fades up 12px (600ms). The rule beneath it draws left to right (`scaleX` 0 to 1, 700ms). With an SVG logo, the swash draws on instead of fading. Then the hero headline rises line by line from behind a mask (SplitText lines, `yPercent` 100 to 0, stagger 90ms). The lantern photo unveils from the bottom (`clip-path: inset(100% 0 0 0)` to `inset(0)`) while settling from scale 1.08 to 1. Total under 2.2 seconds. Text is readable at all times, so never hide the page behind a loader. On repeat visits in the same session, skip straight to the end state.
2. **Philosophy, the signature moment.** On the dark section, the body text starts at 22% opacity in ivory. As the reader scrolls, each word warms into full ivory, as if a lamp were moving down the page (ScrollTrigger scrub, word-level SplitText, from roughly 80% to 35% of the viewport). The headline "Someone was listening." itself lights from `--stone` to `--amber` first. This is the only scroll-scrubbed text effect on the site. It is the story of the frog being heard, made visible.
3. **Section headings.** Every h2 uses the same masked line rise as the hero. Eyebrows fade in 120ms before their headline.
4. **Images.** Every photo reveals with the same bottom-up clip-path wipe and scale settle. The hero image drifts upward by 6% across the hero's scroll (very slow parallax). No other parallax.
5. **Experience cards.** Rise 24px and fade in, staggered 90ms. On hover (pointer devices only), the walnut top rule extends to full width and the card shifts from linen to ivory over 220ms. No lift, no shadow.
6. **Her story.** The photo is sticky (CSS `position: sticky`) while the paragraphs pass. Paragraphs fade up one by one. No JS needed beyond the reveal.
7. **Links and buttons.** Text links get an underline that draws from left to right on hover. Buttons shift background from ink to walnut over 220ms. Focus states are an ember outline, offset 3px, never animated away.
8. **Header.** Slides up out of view on scroll down and back on scroll up (`--ease-inout`, 400ms). The active section's nav item gets a thin ember underline.
9. **Smooth scroll.** Lenis with a gentle `lerp` (about 0.1). Anchor links glide to their sections. Never hijack scroll speed or snap sections.

### Never

Bounce or elastic easing, spinning, typewriter text, glowing text, particles, gradient blobs, animated grain, custom cursors, autoplaying video, horizontal scroll-jacking, pinned sections longer than the content, or animating every element on the page. If two things move at once, one of them is probably wrong.

### Accessibility and performance

- **`prefers-reduced-motion: reduce`**: no Lenis, no intro, no scrub, no parallax. Everything renders in its final state. Short opacity fades of 200ms or less are acceptable.
- Animate only `transform`, `opacity` and `clip-path`. Use `will-change` only while an animation runs.
- Content must be fully readable with JavaScript off. Start hidden states from a `.js` class on `<html>`, never in the base CSS.
- Mobile: same moments, with shorter distances (12px instead of 24px), no sticky photo, no parallax, and the Philosophy scrub kept (it works well with a thumb).
- Budget: under 90KB of gzipped JS in total, Largest Contentful Paint under 2.5s on a mid-range phone, no layout shift.

## TBC items this document adds

| ID | What | From |
|---|---|---|
| `fonts-confirm` | Original fonts used in the logo | Logo designer, via Merley |
| `logo-vector` | SVG version of the logo | Logo designer, via Merley |
| `photo-originals` | Original, uncompressed versions of photos 7, 4, 9 and 2 | Merley |
| `headshot-preferred` | A portrait of Merley, ideally hosting or indoors (optional for launch) | Merley |
