# Celebrate Sweetly + Luminary Atelier build

Paid client build for Merley Greenidge (Los Angeles), run by Sadick Achuli. Two deliverables:
1. **Luminary Atelier**: a new static site for theluminaryatelier.com (note the "the"). Gatherings of 15 to 20 people, phones off, a guided conversation about gratitude. Tagline: "The Art of Gathering with Gratitude". Not a shop.
2. **Celebrate Sweetly**: refresh and redesign of her Shopify store (Studio theme). Not handled in this folder's code yet.

Soft launch: 28 October 2026.

## Where things are
- `CONTEXT/`: who she is, her voice, the agreed scope, the Shopify audit. Read before writing anything in her voice.
- `CONTENT/luminary/`: approved site copy, one file per section. **Use verbatim.**
- `OUTPUTS/design-direction.md`: palette, type, layout, imagery, motion. **The design authority.**
- `OUTPUTS/prompts/`: numbered task prompts. Run them in order.
- `ASSETS/`: logo and photos. Read only.
- `BUILD/`: where built sites go.

## Hard rules
- **Never use em dashes**, anywhere: copy, code comments, alt text, commit messages, reports.
- Never edit `ASSETS/`, `CONTENT/` or `CLIENT/`. Copy what you need into `BUILD/`.
- Never invent experience names, prices, dates, testimonials, addresses, phone numbers or links. Unknowns become visible `[TBC: ...]` placeholders.
- Never rewrite approved copy. If something reads wrong, report it and leave it.
- **Ask before deleting any file.**
- Never deploy, and never touch DNS or GoDaddy. Her email runs on theluminaryatelier.com: when the domain is eventually pointed, change only A and CNAME records and leave MX and TXT alone.
- Banned in anything written in her voice: "one size fits all", "delight your clients", "elevate your brand", "I'm thrilled to share / announce". "Elevated" and "quiet luxury" only with a concrete detail.

## Design house rules (avoid the AI-template look)
- Restraint over volume. Solid satin, not bright print.
- No centered title on a gradient, no glow, no particles, no gradient blobs, no rounded app-style cards with shadows, no emoji, no stock icons, no teal.
- Motion: only the moments listed in the design direction. Do not animate everything. Respect `prefers-reduced-motion`.

## Working loop
1. Plan first and show the plan before writing code.
2. Build.
3. Serve locally, take Playwright screenshots at 375, 768 and 1280px, look at them, fix the weakest three things, repeat.
4. End every task with a short report: what changed, what is still [TBC], and anything you could not do.
