# Shree Dental Care Pvt Ltd

This is a dependency-free, responsive static website for Shree Dental Care Pvt Ltd in Imadol, Lalitpur.

## Run locally

Open `index.html` in a browser, or serve the folder over HTTP with any static server. No build step is required.

## Before production launch

- Replace the remote Unsplash image URLs with approved, optimized clinic imagery or properly licensed photography.
- Connect `#appointment-form` in `script.js` to a secure HTTPS backend or verified form service. Add server-side validation, spam protection, access controls, retention/deletion rules, and consent logging. The current form intentionally does **not** claim to submit or store patient data.
- Confirm whether `986-3930237` is WhatsApp-enabled before adding a `wa.me` link.
- Confirm the exact clinic street address and Google Maps pin before enabling directions or LocalBusiness coordinates.
- Confirm opening hours with the clinic administrator; they are currently marked provisional.
- Add a privacy policy reviewed for the clinic’s actual data practices.
- Add a production domain to canonical, Open Graph, sitemap and robots metadata.
- The supplied official logo is included as `shree-dental-care-logo.jpe` and is used in the header and footer without distortion.

The site includes all 14 requested services, a responsive navigation, bilingual English/Nepali switching for the core navigation and hero, FAQs, contact information, an honest appointment integration state, and accessibility-focused form labels and status messaging.

## Source structure

- `index.html` contains the page structure and content sections.
- `styles.css` contains the design system, component styles, and responsive breakpoints.
- `script.js` contains mobile navigation, appointment validation, and language switching.
- `.prettierrc.json` keeps formatting consistent when files are edited.

To format the source after editing, run:

```bash
npx prettier --write index.html styles.css script.js
```
