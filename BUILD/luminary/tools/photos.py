"""Luminary Atelier: every photo used on the site, in one list.

Crops the originals in ASSETS/photos/ and writes JPEG and WebP files into
BUILD/luminary/assets/photos/. When Merley's original photos arrive:
put them in ASSETS/photos/, point SOURCES below at the new filenames,
check the crop boxes still frame the same thing, and run:

    python BUILD/luminary/tools/photos.py

The HTML never changes: it only refers to the output names below.
Never upscales. One gentle warm grade across the whole set.
Needs Python 3 and Pillow (pip install pillow).
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]          # project folder
SRC = ROOT / "ASSETS" / "photos"
OUT = Path(__file__).resolve().parents[1] / "assets" / "photos"

# Contact sheet numbers (OUTPUTS/photo-contact-sheet.jpg) to source files
SOURCES = {
    1: "WhatsApp Image 2026-10-09 at 6.37.50 PM (1).jpeg",   # mural
    2: "WhatsApp Image 2026-10-09 at 6.37.50 PM (2).jpeg",   # carved door
    3: "WhatsApp Image 2026-10-09 at 6.37.50 PM (3).jpeg",   # garden
    4: "WhatsApp Image 2026-10-09 at 6.37.50 PM.jpeg",       # horizon from the plane
    7: "WhatsApp Image 2026-10-09 at 8.13.56 PM.jpeg",       # lantern (satellite dish starts at x 415: keep crops left of it)
    9: "WhatsApp Image 2026-10-09 at 8.17.41 PM.jpeg",       # lattice door, cool lobby light
    14: "dib.jpeg",                                          # desert at night, orange robe
}

# Extra white balance for the cool, flash-lit lobby photo (about +500K), applied before the set grade
WARM_LOBBY = (1.08, 1.01, 0.88)

# output name: (photo number, crop box (left, top, right, bottom), max output width, extra white balance)
PHOTOS = {
    # Hero floating cards, 4:5, 360px wide (shown at about 200px; kept light so they never delay the headline)
    "card-lantern":  (7,  (0, 446, 408, 956),    360, None),
    "card-door":     (2,  (0, 360, 1126, 1768),  360, None),
    "card-garden":   (3,  (0, 32, 768, 992),     360, None),
    "card-lattice":  (9,  (170, 500, 890, 1400), 360, WARM_LOBBY),
    "card-desert":   (14, (40, 250, 600, 950),   360, None),
    # Filmstrip frames, 3:4, in strip order
    "film-door":     (2,  (0, 300, 1126, 1801),  750, None),
    "film-garden":   (3,  (0, 0, 768, 1024),     750, None),
    "film-mural":    (1,  (0, 0, 768, 1024),     750, None),
    "film-lantern":  (7,  (0, 400, 408, 944),    750, None),
    "film-lattice":  (9,  (0, 300, 900, 1500),   750, WARM_LOBBY),
    "film-desert":   (14, (20, 200, 620, 1000),  750, None),
    "film-horizon":  (4,  (19, 0, 881, 1150),    750, None),   # stops above the plane window
    # Philosophy band (full-bleed, shown short and cropped to the horizon line)
    "philosophy-horizon": (4, (0, 650, 900, 1010), 900, None),
    # Her story: tall frame for the full-height sticky panel
    "story-merley-door": (9, (0, 180, 900, 1530), 900, WARM_LOBBY),
    # Marquee thumbnails: tight detail crops, 4:5
    "detail-carving":    (2,  (420, 630, 700, 980), 240, None),
    "detail-lantern":    (7,  (70, 565, 218, 750),  240, None),
    "detail-embroidery": (14, (145, 470, 249, 600), 240, None),
}

SET_GRADE = (1.03, 1.0, 0.955)   # gentle warmth for the whole set
NIGHT = {4, 14}                  # night photos: lift shadows less, they get noisy


def curve(gain, lift):
    # lift the shadows by up to `lift` levels, fading out by the midtones, then apply the gain
    return [min(255, round((v + lift * (1 - v / 255) ** 2) * gain)) for v in range(256)]


def grade(im, gains, lift):
    r, g, b = im.split()
    return Image.merge("RGB", tuple(ch.point(curve(k, lift)) for ch, k in zip((r, g, b), gains)))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (num, box, max_w, wb) in PHOTOS.items():
        im = Image.open(SRC / SOURCES[num]).convert("RGB").crop(box)
        if wb:
            im = grade(im, wb, lift=8)
        im = grade(im, SET_GRADE, lift=4 if num in NIGHT else 10)
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        im.save(OUT / f"{name}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
        im.save(OUT / f"{name}.webp", "WEBP", quality=80, method=6)
        print(f"{name:20s} {im.width}x{im.height}")


if __name__ == "__main__":
    main()
