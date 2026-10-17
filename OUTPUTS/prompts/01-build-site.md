# Prompt 01: Build the Luminary Atelier static site

You are building a one-page static website for **Luminary Atelier**, a small business run by Merley Greenidge in Los Angeles. She hosts small gatherings (15 to 20 people, phones put away, a guided conversation about gratitude). Her tagline is "The Art of Gathering with Gratitude". The site will live at **theluminaryatelier.com** (note the "the"). It is not a shop: no cart, no prices beyond what the copy gives, no commerce elements of any kind.

Work from the project root (the folder containing `CONTENT/`, `ASSETS/`, `OUTPUTS/`, `BUILD/`).

## 0. Preconditions (check first, stop if any fail)

1. `OUTPUTS/design-direction.md` must exist. If it does not, **stop and report**. Do not invent a palette or typography.
2. These five copy files must exist in `CONTENT/luminary/`: `opening.md`, `philosophy.md`, `experiences.md`, `her-story.md`, `celebrate-sweetly-link.md`.
3. The logo is at `ASSETS/logos/luminary atelier.png` (the folder is `logos`, and the filename has a space).
4. Photos are in `ASSETS/photos/` (WhatsApp JPEGs, one MP4 and `dib.jpeg`).

## 1. Hard rules

- **Use the copy verbatim.** Do not rewrite, shorten, "improve" or add marketing lines. The copy is approved and written in the client's voice. The only text you may write yourself is listed in section 5, and you must use it exactly as given.
- **Never use em dashes** anywhere: copy, alt text, meta tags, comments or the README.
- **Never invent** experience names, prices, dates, testimonials, addresses, phone numbers or social links. Anything unknown becomes a `[TBC]` placeholder (see section 4).
- **Do not write into `ASSETS/`, `CONTENT/` or `CLIENT/`.** Copy what you need into the build folder.
- **Do not deploy anything, and do not touch DNS or GoDaddy.** (Her email runs on this domain. Whoever points the domain later must change only A and CNAME records and leave MX and TXT alone.)
- No frameworks and no build step. Use plain HTML, one CSS file and vanilla JS, plus only the motion libraries named in `OUTPUTS/design-direction.md` (GSAP with ScrollTrigger and SplitText, and Lenis). Download pinned versions into `js/vendor/` and load them locally. The only external requests allowed are Google Fonts. The site must work on any static host and be fully readable with JavaScript off.

## 2. Output

Create `BUILD/luminary/` containing:

```
BUILD/luminary/
  index.html
  thank-you.html
  css/styles.css
  js/main.js
  js/motion.js     (all animation code, in one place)
  js/vendor/       (pinned GSAP, ScrollTrigger, SplitText, Lenis)
  assets/logo/      (logo + favicon files)
  assets/photos/    (optimized, renamed photos)
  TBC-LIST.md
  README.md
  _review/          (screenshots from your checks)
```

## 3. Page structure (single page, in this order)

| # | Section | Anchor | Source file |
|---|---------|--------|-------------|
| 1 | Header: logo + nav | | |
| 2 | Opening (hero) | `#top` | `opening.md` |
| 3 | Philosophy | `#philosophy` | `philosophy.md` |
| 4 | Signature Experiences | `#gatherings` | `experiences.md` |
| 5 | Her story | `#about` | `her-story.md` |
| 6 | Celebrate Sweetly link | `#celebrate-sweetly` | `celebrate-sweetly-link.md` |
| 7 | Inquiry form | `#inquire` | section 5 below |
| 8 | Footer | | section 5 below |

Nav labels: **Philosophy**, **Gatherings**, **About Merley**, **Get in touch** (links to `#inquire`). On mobile the nav collapses behind an accessible menu button.

**How to map the copy files:** each file uses labels like `**Eyebrow:**`, `**Headline:**`, `**Subline:**`, `**Intro line:**`, `**Body:**`, `**Button:**`, `**Closing line:**`. These are labels for you, not text to show. Render the eyebrow as a small label above the headline, the headline as the section heading (`h1` in the hero only, `h2` elsewhere), and body paragraphs as `p`. For buttons, the text before the parenthesis is the button label and the parenthesis says where it links. Skip the `# ...` title line at the top of each file.

- Opening: the "Start a conversation" button links to `#inquire`.
- Experiences: the three cards sit side by side on desktop and stack on mobile. Each card's "Ask about this gathering" button links to `#inquire` and preselects that card in the form's "Which gathering" field (`?gathering=1` or a data attribute plus JS is fine). The closing line and its button go below the cards.
- Celebrate Sweetly: the button links to `https://www.celebratesweetly.com` and opens in the same tab.

## 4. [TBC] placeholders (must stay visible)

Every `[TBC]` in the copy, plus every unknown listed in section 5, must render **visibly** on the page and be trivially easy to find and replace.

- Markup: `<span class="tbc" data-tbc="ID">[TBC: short description]</span>`, for example `data-tbc="exp1-name"` showing `[TBC: Experience 1 name]`.
- IDs: `exp1-name`, `exp1-summary`, `exp1-audience`, `exp1-details`, `exp1-price`, `exp1-date` (and the same for `exp2`, `exp3`), plus the IDs from section 5.
- Style `.tbc` so it is obvious but does not break the layout: a dashed outline in a muted warm color with a light tinted background, inheriting font size. Put the rule in a clearly commented block at the top of `styles.css`: `/* TBC PLACEHOLDERS: remove before launch */`.
- Every placeholder must contain the literal text `[TBC`, so that `grep -rn "\[TBC" BUILD/luminary` finds them all.
- Write `TBC-LIST.md`: a table of every placeholder with its ID, what it needs, the file and approximate line, and who supplies it (always "Merley").

## 5. Text you add (use exactly as written)

**Inquiry section** (`#inquire`)
- Eyebrow: `Get in touch`
- Headline: `Tell me what you have in mind`
- Fields:
  - Name (required)
  - Email (required, `type="email"`)
  - Phone (optional)
  - Which gathering (select): the three experience names as `[TBC: Experience 1 name]` etc., plus `Something else`
  - Roughly how many people (optional, number)
  - Your message (required, textarea), label: `Tell me a little about it`
- Submit button: `Send`
- Below the button, in small text: `Your message comes straight to me, and I read every one.`

**Form delivery: posts to merley@theluminaryatelier.com**
A static site cannot send email by itself, so use a hosted form service. Build for **Formspree** (plain HTML `POST`, no backend):
- `<form action="FORM_ENDPOINT" method="POST">` where the endpoint is a single clearly marked placeholder, `https://formspree.io/f/[TBC-FORM-ID]`, also listed in `TBC-LIST.md` as `form-endpoint` (supplier: Sadick, who creates the form with merley@theluminaryatelier.com as the recipient and verifies it).
- Include `<input type="hidden" name="_subject" value="New Luminary Atelier inquiry">`, a `_replyto` mapping on the email field, and a hidden honeypot field (`_gotcha`) for spam.
- Use client-side `fetch` to submit, show the success message inline, and fall back to a normal POST redirecting to `thank-you.html` if JS is off.
- Success message (inline and on `thank-you.html`): `Thank you for reaching out. I'll read this myself and write back to you.` `thank-you.html` also gets a link back to the homepage, labelled `Back to Luminary Atelier`.
- Error message: `Something went wrong sending your message. Please try again, or write to me at merley@theluminaryatelier.com.`
- Add a visible mailto link to `merley@theluminaryatelier.com` beneath the form as a fallback.
- Do not submit test messages to a live endpoint. Test the success and error states by mocking `fetch`.

**Footer**
- Logo (small), `The Art of Gathering with Gratitude`
- Email link: `merley@theluminaryatelier.com`
- Social links: `[TBC: Instagram link]` (`social-instagram`), `[TBC: LinkedIn link]` (`social-linkedin`)
- Link: `Celebrate Sweetly` to `https://www.celebratesweetly.com`
- `© 2026 Luminary Atelier`

**Head / SEO**
- `<title>`: `Luminary Atelier | The Art of Gathering with Gratitude`
- Meta description: `Small gatherings, phones put away, and a real conversation about gratitude, hosted by Merley Greenidge.`
- Canonical and `og:url`: `https://theluminaryatelier.com/`
- Open Graph title and description as above, `og:image` set to the hero photo. Add `lang="en"`, a viewport meta and a theme-color from the palette.

## 6. Photos and logo

- **Use the photo map in `OUTPUTS/design-direction.md` (Imagery section) exactly**: photo 7 for the hero, photo 4 for Philosophy, photo 9 for Her story, photo 2 for the Celebrate Sweetly section. Use no other photos, and respect its "do not use" list. Open each chosen file and confirm it matches the description before using it.
- Copy the chosen photos into `assets/photos/` with descriptive names and no spaces (`hero-lantern.jpg`, `philosophy-horizon.jpg`, `story-merley-door.jpg`, `celebrate-doorway.jpg`). Apply the gentle warm treatment the design direction describes, in the files themselves. Do not upscale beyond the original size. Export JPEG (quality about 82) and WebP, serve them with `<picture>`, lazy-load everything below the hero, and set `width` and `height` to avoid layout shift.
- Write plain, literal alt text describing what is in each photo. Don't name places you can't verify from the image.
- Skip the MP4. No autoplay video.
- Logo: follow the Logo use section of the design direction. Copy the original to `assets/logo/luminary-atelier.png`, make a transparent ivory version for the footer, and generate `favicon-32.png`, `favicon-180.png` (apple-touch-icon) and `favicon.ico` from the monogram. Never redraw or restyle the artwork.
- Add the design direction's TBC items (`fonts-confirm`, `logo-vector`, `photo-originals`, `headshot-preferred`) to `TBC-LIST.md`. These are not shown on the page; they are list-only.

## 7. Design and motion

- **`OUTPUTS/design-direction.md` is the authority** for palette, typography, spacing, layout, imagery and motion. Read all of it before writing code and follow it exactly. Put every color, font, spacing, easing and duration value in CSS custom properties at the top of `styles.css`, so they can be changed in one place.
- **Motion:** build only the moments listed in the design direction's Motion section, with its tokens, and nothing from its "Never" list. The Philosophy word-by-word lighting effect is the signature moment, so give it the most care. Set all hidden starting states via a `.js` class on `<html>`, so the page is complete without JavaScript.
- `prefers-reduced-motion: reduce` must disable Lenis, the intro, the scrub and parallax, and render everything in its final state.
- Mobile-first and responsive at 375px, 768px and 1280px+. Body text 60 to 75 characters per line.
- Accessibility: WCAG 2.1 AA contrast, visible focus states, labelled form fields, a skip link, semantic landmarks (`header`, `main`, `section` with `aria-labelledby`, `footer`) and a keyboard-operable menu.

## 8. README.md (for Sadick, plain language)

Cover: what is in the folder, how to preview it locally, how to find and replace every `[TBC]` (point to `TBC-LIST.md` and the grep command), how to set the Formspree endpoint, how to remove the TBC styling block before launch, and the DNS warning (change only A and CNAME; leave MX and TXT alone or her email breaks). Keep it short. No em dashes.

## 9. Verify before you finish

1. Serve locally from `BUILD/luminary/` (`npx serve .` or `python -m http.server`, whichever is installed). With Playwright, take full-page screenshots at 375px, 768px and 1280px, once with motion and once with reduced motion emulated, after scrolling to the bottom so every reveal has fired. Also take three frames of the Philosophy section mid-scroll (start, middle, end of the word lighting). Save them all to `_review/`. Look at every screenshot, score the result honestly against the design direction, fix the three weakest things, and repeat at least twice.
2. Diff the rendered text against the `CONTENT/luminary/` files and confirm every sentence appears verbatim and nothing extra was added beyond section 5.
3. `grep -rnP "\x{2014}" BUILD/luminary` (the em dash character, U+2014) returns nothing.
4. `grep -rn "\[TBC" BUILD/luminary` matches every entry in `TBC-LIST.md`, and vice versa.
5. All internal anchors work, the gathering preselect works, and the Celebrate Sweetly links point to `https://www.celebratesweetly.com`.
6. The form validates required fields, and the mocked success and error states show the exact messages from section 5.
7. Motion: no layout shift during reveals, nothing from the design direction's "Never" list, the intro runs once per session, and the page is complete with JavaScript disabled.
8. No console errors. All images load and have alt text. Lighthouse (if available) shows accessibility 95+ on mobile.

## Done looks like

- `BUILD/luminary/` exists with the structure in section 2, opens directly in a browser, and matches the design direction.
- All approved copy is present verbatim, in the section order above.
- Every unknown is a visible, greppable `[TBC]` listed in `TBC-LIST.md`.
- The form is wired for Formspree to merley@theluminaryatelier.com and needs only the form ID to go live.
- Nothing has been deployed, and `ASSETS/`, `CONTENT/` and `CLIENT/` are untouched.
- Finish with a short report: which photos you used where (original filename to new filename), the library versions you vendored, anything in the design direction you could not apply, and any problems you noticed in the copy (report them, do not fix them).
