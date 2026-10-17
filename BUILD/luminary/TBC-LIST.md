# TBC list: everything still to confirm

Every unknown on the site is a visible `[TBC: ...]` placeholder. To find them all, run this from `BUILD/luminary/`:

```
grep -rn "\[TBC" --include=*.html .
```

On the page, each one is wrapped like this, so the ID tells you which item it is:

```html
<span class="tbc" data-tbc="exp1-name">[TBC: Experience 1 name]</span>
```

Replace the whole `<span>...</span>` with the real text. Line numbers are approximate.

## On the page

| ID | What it needs | File and line | Supplied by |
|---|---|---|---|
| `exp1-name` | Experience 1 name (also the first option in the form's "Which gathering" list, line 267) | index.html 142, 267 | Merley |
| `exp1-summary` | Experience 1 in one sentence | index.html 143 | Merley |
| `exp1-audience` | Who Experience 1 is for | index.html 145 | Merley |
| `exp1-details` | Experience 1 length and setting | index.html 146 | Merley |
| `exp1-price` | Experience 1 price | index.html 147 | Merley |
| `exp1-date` | Experience 1 next date | index.html 148 | Merley |
| `exp2-name` | Experience 2 name (also form option, line 268) | index.html 153, 268 | Merley |
| `exp2-summary` | Experience 2 in one sentence | index.html 154 | Merley |
| `exp2-audience` | Who Experience 2 is for | index.html 156 | Merley |
| `exp2-details` | Experience 2 length and setting | index.html 157 | Merley |
| `exp2-price` | Experience 2 price | index.html 158 | Merley |
| `exp2-date` | Experience 2 next date | index.html 159 | Merley |
| `exp3-name` | Experience 3 name (also form option, line 269) | index.html 164, 269 | Merley |
| `exp3-summary` | Experience 3 in one sentence | index.html 165 | Merley |
| `exp3-audience` | Who Experience 3 is for | index.html 167 | Merley |
| `exp3-details` | Experience 3 length and setting | index.html 168 | Merley |
| `exp3-price` | Experience 3 price | index.html 169 | Merley |
| `exp3-date` | Experience 3 next date | index.html 170 | Merley |
| `social-instagram` | Instagram link for the footer | index.html 302 | Merley |
| `social-linkedin` | LinkedIn link for the footer | index.html 303 | Merley |
| `form-endpoint` | Formspree form ID. Replace `[TBC-FORM-ID]` in the form `action`. Create the form in Formspree with merley@theluminaryatelier.com as the recipient and verify that address. | index.html 237 (marked by the comment on 236) | Sadick |

Inside the form's dropdown the three names are plain text (an `<option>` cannot hold a `<span>`), so they have no `data-tbc` attribute. They are listed above with their cards.

## List only (not shown on the page)

| ID | What it needs | Where it matters | Supplied by |
|---|---|---|---|
| `fonts-confirm` | The original fonts used in the logo, from whoever designed it. The site uses Bodoni Moda and Jost as close matches; swap them in `css/styles.css` (top) and the Google Fonts link in both HTML files if the designer names others. | css/styles.css, index.html, thank-you.html | Merley (from the logo designer) |
| `logo-vector` | An SVG version of the logo. With it, the header and footer stay sharp at any size and the swash could draw on in the opening. | assets/logo/ | Merley (from the logo designer) |
| `photo-originals` | The original, uncompressed photos from her phone for the lantern, the horizon, the lattice door and the carved doorway. The current WhatsApp copies are small; the hero is only 768px wide. | assets/photos/ | Merley |
| `headshot-preferred` | A portrait of Merley, ideally hosting or indoors, for "Why I listen first". Optional for launch. | assets/photos/story-merley-door.* | Merley |
