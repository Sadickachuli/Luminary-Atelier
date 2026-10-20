# Luminary Atelier website

A one-page static site for theluminaryatelier.com. Plain HTML, one CSS file and a little JavaScript. No build step: it runs on any static host as it is.

## What is in this folder

| Path | What it is |
|---|---|
| `index.html` | The whole site, one page |
| `thank-you.html` | Shown after the form is sent, if the visitor has JavaScript off |
| `css/styles.css` | All styles. Colors, fonts, spacing and motion timings are at the top. |
| `js/main.js` | Menu, header, form sending |
| `js/motion.js` | All animation, in one place |
| `js/vendor/` | GSAP 3.15.0 (with ScrollTrigger and SplitText) and Lenis 1.3.26, saved locally |
| `fonts/` | Bodoni Moda and Jost, self-hosted, with their SIL Open Font Licence files. No requests to Google. |
| `assets/logo/` | Logo, the ivory footer version, the header monograms (ink and ivory) and the favicons |
| `assets/photos/` | Every photo on the page, cropped and warmed, as JPEG and WebP. Made by `tools/photos.py`. |
| `tools/photos.py` | The one list of photos: which original, which crop, which output name. Not needed on the server. |
| `TBC-LIST.md` | Every detail still to confirm |
| `_review/` | Screenshots from testing. Do not upload this folder. |

## Swapping in Merley's original photos

1. Put the originals in `ASSETS/photos/` (in the project folder, next to `BUILD/`).
2. In `tools/photos.py`, point `SOURCES` at the new filenames and check each crop box still frames the same thing. The originals will be larger, so the boxes need scaling up.
3. Run `python BUILD/luminary/tools/photos.py` from the project folder (needs `pip install pillow`).

The output names stay the same, so the HTML does not change. If the new files have a different size, update the `width` and `height` on the matching `<img>` in `index.html` so nothing jumps while loading.

## Preview it on your computer

From this folder, run one of these, then open http://localhost:8000 in a browser:

```
python -m http.server 8000
npx serve . -l 8000
```

## Fill in the [TBC] placeholders

Everything still unknown shows on the page as `[TBC: ...]` in a lightly tinted note with a dotted underline. `TBC-LIST.md` lists each one with its ID, file and line. To find them all:

```
grep -rn "\[TBC" --include=*.html .
```

Replace the whole `<span class="tbc" ...>...</span>` with the real text. The three gathering names also appear in the form's "Which gathering" dropdown, so change them there too.

## Set up the form

1. Create a form at formspree.io with **merley@theluminaryatelier.com** as the recipient, and verify that address.
2. In `index.html`, find `https://formspree.io/f/[TBC-FORM-ID]` and replace `[TBC-FORM-ID]` with the form's ID.
3. Send one real test from the live site and check it arrives.

With JavaScript on, the thank-you message appears in place. With JavaScript off, visitors see Formspree's own thank-you page (a custom redirect needs a paid Formspree plan).

## Before launch: remove the TBC styling

When every placeholder is replaced, delete the block at the very top of `css/styles.css` marked `TBC PLACEHOLDERS: remove before launch`. Run the grep above first: it should find nothing.

## Pointing the domain: read this first

Her email runs on theluminaryatelier.com. When pointing the domain at the host, **change only the A and CNAME records. Leave the MX and TXT records exactly as they are, or her email stops working.** Nothing has been deployed and DNS has not been touched.
