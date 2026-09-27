# Site update notes

Last reviewed: **September 26, 2026**. This file records content decisions and
source material for future website updates.

## Property and pricing

- Address: **376 Hearst Dr, Merced, CA 95348**.
- Regular bedroom: **$500/month**; master bedroom: **$750/month**.
- Utilities and tenant-arranged internet are separate. Do not imply either is
  included or publish unconfirmed availability, deposits, or lease terms.
- Use the existing real property photographs for room and house details. The
  student illustration and campus map are decorative artwork, not property photos.

## Driving and campus artwork correction

The user supplied the **six-minute estimate from 376 Hearst Dr to UC Merced** on
September 26. The site presents this as **about six minutes by car**, consistent
with the previous driving context. It is a user-provided estimate, not an
independently measured route, a bus duration, or a guaranteed arrival time.
Allow additional time for traffic, parking, and walking to class.

The supplied [sculpture reference photo](../output/imagegen/references/uc-merced-sculpture.png)
shows two tall, asymmetric, curved silver metal blades with an open gap at the
top. The old pointed tower was incorrect. Preserve the open silhouette and
metallic texture in future artwork; do not turn it into an obelisk or a closed arch.

The revised [campus illustration](../img/campus-connection.png):

- Shows the house east of M Street, between Cardella Road and Bellevue Road,
  with campus to the northeast.
- Keeps Hearst Drive as a short detached schematic segment; it must not imply
  a verified direct street connection to M Street.
- Labels the driving estimate separately from CatTracks service.
- Represents the campus with the corrected sculpture. The sculpture is not a
  marker for the precise location of the University Transit Center.
- Is explicitly **not to scale**. Decorative buildings, trees, water, and route
  lines do not establish exact geography or navigation directions.
- Uses general weekday service labels so changing schedules can be updated in
  HTML without repeatedly regenerating the picture.

The exact image edit prompt and tool mode are in the
[image generation log](../output/imagegen/campus-connection.md).

## CatTracks source review

All seven user-supplied PDFs were read as text and visually checked. Their visible
headings say **Fall 2026, Monday–Friday**. Some PDF metadata titles still say
Spring 2025; use the visible timetable heading, not that stale metadata.
The retained copies below are source snapshots, not a promise of current service.

The ranges below are **calculated differences between published departure
times**, using the campus-bound stop row and the next University Transit Center
row in the same trip column. The PDFs explicitly label their times as departures,
so these are not measured ride times or campus arrival times and can include
terminal dwell. Do not silently remove the longer columns. Walking to the stop,
waiting, delays, and walking to class are additional.

| Route and retained source (page 1) | M St. & Bellevue Rd. → UTC | Cardella Rd. & M St. → UTC | Campus stop heading |
| --- | --- | --- | --- |
| [FastCat](sources/cattracks-fall-2026/fastcat.pdf) | 11–26 min (14 trips) | 15–30 min (14 trips) | UTC North |
| [FastCat 2](sources/cattracks-fall-2026/fastcat2.pdf) | 11–26 min (12 trips) | 15–30 min (12 trips) | UTC North |
| [Bobcat Express](sources/cattracks-fall-2026/bobcatexpress.pdf) | 11–26 min (13 trips) | No regular campus-bound pickup row | UTC North |
| [G Line](sources/cattracks-fall-2026/gline.pdf) | 11–26 min (13 trips) | No listed pickup row | UTC South |
| [C-1](sources/cattracks-fall-2026/c-1.pdf) | 11–26 min (13 trips) | No listed pickup row | UTC South |
| [C-2](sources/cattracks-fall-2026/c-2.pdf) | 11–26 min (15 trips) | 14–29 min, **northbound** (15 trips) | UTC South |
| [Yosemite Express](sources/cattracks-fall-2026/yosemiteexpress.pdf) | Not listed | Not listed | UTC North |

Calculation examples: FastCat's 6:48 Cardella departure precedes the 7:03 UTC
departure by 15 minutes; its 7:52 → 8:22 column spans 30 minutes. C-2's
6:48 → 7:02 column spans 14 minutes. Crossing noon is handled chronologically.
Where FastCat schedules repeat UTC later in the loop, use the first UTC row
after the Bellevue Ranch stops.

Other details to preserve:

- C-2 lists both **northbound and southbound** Cardella stops. The northbound row
  is the one used for campus-bound timing.
- `REQ.` means **request stop-drop only**, not a scheduled pickup. Blank cells
  and REQ-only columns are excluded from the calculations.
- Bobcat Express mentions Cardella and Bellevue Ranch in a late-night
  request-drop note after the 9:20 p.m. Amtrak departure. This does not establish
  an additional regular campus-bound pickup at Cardella.
- Yosemite Express serves Moraga and other destinations; neither of the two
  highlighted M Street stops appears in its timetable. Do not count it as a
  direct route from these stops.
- The supplied files establish weekday service only. Do not infer weekend,
  holiday, fare, headway, or real-time service information from them.
- Walking times and the closest practical stop have not been established.
  Avoid reviving old one-minute walking or five-minute bus claims.

For future changes, consult [UC Merced's official routes and schedules](https://taps.ucmerced.edu/transportation/cattracks-and-route-uc/routes)
and the [live CatTracks map](https://cattracks.transloc.com/). Refresh the source
snapshots and review date when a new semester schedule is published.

## Files updated and maintenance workflow

- `about.html`: corrected map, accessible text, six-minute drive, both stops,
  expanded route coverage, full-size map link, and timetable explanation.
- `index.html`: driving estimate, two CatTracks stops, and separate bus timing.
- `faqs.html`: the same driving/bus distinction and combined Cardella range.
- `img/campus-connection.png`: full-resolution editable source for imagegen.
- `img/opt/campus-connection-{640,1280,1536}.webp`: responsive delivery images.
- `output/imagegen/references/uc-merced-sculpture.png`: preserved user reference.
- `docs/sources/cattracks-fall-2026/`: all seven supplied timetable snapshots.

After changing the illustration, run `npm run images`. It regenerates only stale
WebP derivatives and preserves the originals. Update the `?v=20260926` cache
version on **all** campus-map URLs in `about.html`, including `srcset` and the
full-size link. Check labels and sculpture shape at full resolution, then check
the page on desktop and mobile; important facts must remain readable as HTML.

After any content update, run `npm test` and `npm run build`. The build includes
referenced public assets and excludes these unreferenced source notes and PDFs.
GitHub Pages served directly from the repository root still exposes repository
files at their paths. Do not put private tenant information in this repository.

For pricing changes, update the home, pricing, FAQ, contact, application, and
resources pages together. Preserve the application's FormSubmit endpoint and
redirect. Verify forms without sending fabricated applications.

## September 26 validation

The schedule ranges were recalculated from all numeric campus-bound trip columns
and checked against the rendered PDFs. Image output was reviewed for the correct
sculpture, address, driving label, and separate bus-service labels.

`npm test` and `npm run build` passed for all 10 pages and 75 public files. The
updated image loaded in the local browser; desktop layout was visually checked
and the campus page had no horizontal overflow at a 391-pixel mobile viewport.
