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
| `exp1-name` | Experience 1 name (also the first option in the form's "Which gathering" list) | index.html 199, 349 | Merley |
| `exp1-summary` | Experience 1 in one sentence | index.html 200 | Merley |
| `exp1-audience` | Who Experience 1 is for | index.html 204 | Merley |
| `exp1-details` | Experience 1 length and setting | index.html 205 | Merley |
| `exp1-price` | Experience 1 price | index.html 206 | Merley |
| `exp1-date` | Experience 1 next date | index.html 207 | Merley |
| `exp2-name` | Experience 2 name (also the second form option) | index.html 216, 350 | Merley |
| `exp2-summary` | Experience 2 in one sentence | index.html 217 | Merley |
| `exp2-audience` | Who Experience 2 is for | index.html 221 | Merley |
| `exp2-details` | Experience 2 length and setting | index.html 222 | Merley |
| `exp2-price` | Experience 2 price | index.html 223 | Merley |
| `exp2-date` | Experience 2 next date | index.html 224 | Merley |
| `exp3-name` | Experience 3 name (also the third form option) | index.html 233, 351 | Merley |
| `exp3-summary` | Experience 3 in one sentence | index.html 234 | Merley |
| `exp3-audience` | Who Experience 3 is for | index.html 238 | Merley |
| `exp3-details` | Experience 3 length and setting | index.html 239 | Merley |
| `exp3-price` | Experience 3 price | index.html 240 | Merley |
| `exp3-date` | Experience 3 next date | index.html 241 | Merley |
| `social-instagram` | Instagram link for the footer | index.html 385 | Merley |
| `social-linkedin` | LinkedIn link for the footer | index.html 386 | Merley |
| `form-endpoint` | Formspree form ID. Replace `[TBC-FORM-ID]` in the form `action`. Create the form in Formspree with merley@theluminaryatelier.com as the recipient and verify that address. | index.html 319 (marked by the comment on 318) | Sadick |

Inside the form's dropdown the three names are plain text (an `<option>` cannot hold a `<span>`), so they have no `data-tbc` attribute. They are listed above with their rows.

## List only (not shown on the page)

| ID | What it needs | Where it matters | Supplied by |
|---|---|---|---|
| `fonts-confirm` | The original fonts used in the logo, from whoever designed it. The site uses Bodoni Moda and Jost (self-hosted in `fonts/`) as close matches. If the designer names others, swap the files in `fonts/` and the `@font-face` rules at the top of `css/styles.css`. | fonts/, css/styles.css | Merley (from the logo designer) |
| `logo-vector` | An SVG version of the logo. With it, the header and footer stay sharp at any size and the swash could draw on in the opening. | assets/logo/ | Merley (from the logo designer) |
| `photo-originals` | The original, uncompressed photos from her phone, and any short videos. The WhatsApp copies are small: the lantern photo is only 408px wide once the satellite dish is cropped out. Swap them in with `tools/photos.py` (see README). | assets/photos/, tools/photos.py | Merley |
| `headshot-preferred` | A portrait of Merley, ideally hosting or indoors, for "Why I listen first". Optional for launch. With a clean original, the Her story cut-out effect could also be added. | assets/photos/story-merley-door.* | Merley |
| `photo-people` | Photos 5 (street, two passers-by) and 13 (camels, three companions) are left out because other people are recognisable. They can join the filmstrip if Merley confirms she is happy to show them. | tools/photos.py, index.html filmstrip | Merley |
