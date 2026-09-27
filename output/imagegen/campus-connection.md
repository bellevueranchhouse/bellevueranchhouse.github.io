# Campus connection map

## Current revision — September 26, 2026

Mode: **edit**, using the built-in image generation tool. Input 1 was the previous
`img/campus-connection.png`; input 2 was the user's sculpture photo, retained as
`output/imagegen/references/uc-merced-sculpture.png`.

Saved output: `img/campus-connection.png` (1536 × 1024). Responsive delivery
copies are `img/opt/campus-connection-{640,1280,1536}.webp`, regenerated with
`npm run images`. The website's image URLs use cache version `20260926`.

The revision corrects the campus sculpture and prominently labels the user's
approximately six-minute **drive**. Exact bus ranges now live in HTML and in
`docs/SITE_UPDATES.md`, based on all seven supplied Fall 2026 schedules. General
CatTracks labels in the picture avoid presenting FastCat as the only option.

Exact edit prompt:

```text
Edit the first supplied image, the existing Bellevue Ranch House campus connection schematic. Use the second supplied photograph as the faithful shape reference for the UC Merced sculpture.

Preserve the overall north-up layout, warm ivory background, refined forest-green typography, soft sage watercolor illustrations, house position east of M Street between Cardella Road and Bellevue Road, campus northeast, street labels, bus stop positions, north arrow and generous whitespace. Keep the detached short Hearst Drive segment; do not connect it directly to M Street. This remains an editorial orientation graphic, not an accurate street map.

Required corrections:
1. Replace the incorrect tall pointed tower/obelisk in the upper-right campus scene with a faithful watercolor interpretation of the photographed sculpture: TWO tall, separate, asymmetric curved SILVER METAL blades rising from a shared low base. They curve outward to form an elongated open U or seed-like silhouette with a broad open gap at the top. Left blade has a flat angled top, right blade tapers higher. Reflective textured metallic surfaces. No closed arch, no bridge across the top, no pointy tower. Place it in front of low modern glass university buildings on a lawn. Make it recognizable from the reference.
2. In the open center-right area, add a tasteful compact pale-sage callout with a small car icon and large prominent text EXACTLY "~6 min drive", followed by smaller text EXACTLY "376 Hearst Dr to UC Merced". This is a standalone travel-time callout, not a new route line. Add small supporting text EXACTLY "Allow extra time for traffic and parking."
3. At upper-left stop preserve heading "M St. & Bellevue Rd." but replace "FastCat · 11–26 min" with "CatTracks · weekday service".
4. At lower-left stop preserve heading "Cardella Rd. & M St." but replace "FastCat · 15–30 min" with "CatTracks · weekday service".
5. Replace the bottom footer with "Bus travel takes longer. Check current CatTracks schedules; walking and waiting are extra."
6. Keep "UC Merced" as the campus label, but REMOVE the sublabel "University Transit Center" from the campus illustration; the sculpture represents the campus, not the precise bus stop.
7. Preserve exact title "Your campus connection", house label "Bellevue Ranch House", address "376 Hearst Dr", and "Schematic · not to scale".

Maintain a beautifully clean modern student-housing brand illustration with readable accurate text. The six-minute estimate must unambiguously mean driving, never a six-minute bus ride. Output a landscape image in the same 3:2 composition as the original. Do not alter any real property photographs.
```

## Previous revision — September 12, 2026 (superseded)

Generated with the built-in image generation tool and integrated as
`img/campus-connection.png`.

The map is an editorial schematic based on the property location and official
Fall 2026 FastCat timetable. It shows both nearby M Street stops without calling
either the closest stop. The time ranges are scheduled departure-to-departure
times to the University Transit Center; they exclude walking and waiting.

The first generation used the `infographic-diagram` taxonomy and specified a
north-up composition with the house east of M Street between Cardella Road and
Bellevue Road, the campus northeast, the exact stop names, and these ranges:

- Cardella Rd. & M St.: FastCat · 15–30 min
- M St. & Bellevue Rd.: FastCat · 11–26 min

The final `precise-object-edit` shortened the Hearst Drive segment so it no
longer appears to connect directly to M Street. All labels, locations, routes,
times, and the visual style were preserved.

Sources checked September 12, 2026:

- https://taps.ucmerced.edu/transportation/cattracks-and-route-uc/routes
- https://taps.ucmerced.edu/sites/g/files/ufvvjh1811/f/page/documents/fastcat.pdf
- https://cattracks.transloc.com/routes/47/stops/32
- https://cattracks.transloc.com/routes/47/stops/48
