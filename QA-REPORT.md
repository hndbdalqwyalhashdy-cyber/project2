# OFOQ HOTEL — QA Report

## Scope and method

Interactive checks were run in a browser against the local `file://` build. All 13 site pages were opened, and each was checked at viewport widths of 360, 390, 768, 1024, 1440, and 1920 pixels.

## Results

| Area | Result |
|---|---|
| Pages and internal links | All 13 pages opened; no unknown internal destinations were found. |
| Responsive layout | No horizontal overflow was observed at the six tested widths after the tablet-header fix. |
| Images | 29 Unsplash WebP image URLs returned HTTP 200. No images without `alt` text were found. A deliberately broken image triggered the configured fallback. |
| Accessible controls | No buttons without accessible names were found. |
| Gallery | Lightbox opened as a dialog, showed image alt text, advanced to the next image, and closed with Escape. After the review fixes, keyboard focus cycles inside the dialog and returns to the opener; background scrolling is locked while it is open. |
| FAQ and back-to-top | FAQ expanded/collapsed with matching `aria-expanded` and visibility state. Back-to-top became visible while scrolled and returned the page to `scrollY = 0`. |
| Booking | Three nights at 720 SAR yielded 2,484 SAR including 324 SAR tax. Form steps, validation, and local persistence were exercised. Invalid/reversed URL dates were corrected; malformed dates and guest counts fell back to valid values. |
| Contact and subscription | Invalid contact data was not saved; valid data was saved. Submitting the same subscription twice did not duplicate the address. |
| Room browsing | Filtering, searching, sorting, and quick booking were exercised. Test data in local storage was restored afterward. |
| Theme | Theme switches between light and dark and persists the selection. |
| Language and direction | Arabic (`ar`/`rtl`) switched to English (`en`/`ltr`); the English selection was written to local storage. |
| Mobile navigation | At 390px, the menu opened and closed, with `aria-expanded` and the navigation visibility updating correctly. |
| JavaScript | On `file://`, navigation initially produced `AbortError: Transition was skipped`, with no console error. Automatic view transitions are now enabled only on HTTP(S) when supported; paced direct-file navigation was repeated with no page or console errors. |
| CSS and layout | Local stylesheets loaded without observed CSS read/parse errors. |
| Performance sample | On the home page, browser navigation timings were 123 ms to DOMContentLoaded and 218 ms to load. Six Unsplash image requests were recorded with 440 ms summed request duration. Image transfer sizes were unavailable to the browser measurement (reported as 0 due to cross-origin timing restrictions), so these figures are not a full-page performance audit. |

## Issues fixed during QA

- At 768px, header links caused horizontal overflow. A tablet-width collapsible header was added and the six target widths were rechecked.
- Invalid or reversed booking dates could produce a misleading total. Booking initialization now validates dates, ensures departure follows arrival, and validates guest count.
- Automatic view transitions caused a skipped-transition `AbortError` during direct-file navigation. They are now enabled only on HTTP(S) when the browser supports the API; direct-file navigation was rechecked without page errors.

## Remaining limitations

- The original resort hero image and locally supplied hotel imagery were not present during testing. The asset request list is in [assets/images/README.txt](./assets/images/README.txt); the site currently uses remote Unsplash images.
- No formal external HTML/CSS standards validator or Lighthouse audit was run. Structural checks and runtime behavior were checked in the browser, but they do not replace those validators.
- The HTTP-hosted view-transition path was not tested; only the direct-file preview path was verified.
- Performance results are a single browser sample, not a representative network/device benchmark. Cross-origin image byte sizes were not available.
- Social links point to platform home pages rather than hotel-specific profiles; their destinations were not validated as hotel accounts.

## Overall

The tested pages and interactions worked as described, and the three reproducible defects listed above were fixed and rechecked. This report does not claim formal standards validation or production-network performance certification.
