# propertiesforsales — Pitsilia Properties

Static, responsive Greek/English website for four privately offered properties in Pitsilia, Nicosia, Cyprus.

## Preview locally

Open `index.html` in a browser. No build process, server, libraries or database required.

## Upload to GitHub Pages

1. Create the public GitHub repository **propertiesforsales** (or use the existing one).
2. Upload the contents of **this folder** to the repository root (`index.html`, `css/`, `js/`, `images/`, `README.md`).
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
5. Your expected website URL, if your username is `georgioschr`, is `https://georgioschr.github.io/propertiesforsales/` (only after successful deployment).

## Before public launch

- Replace the placeholders with actual approved property images. For each listing, place its real main image at `images/<folder>/cover.jpg`. Folders: `livadia`, `alona`, `alithinou`, `polystypos`. Image display is automatic.
- Verify areas, zones, title deeds, access and shares against official cadastral documents.
- Set the asking price of the Polystypos building if desired.
- Add approved phone / email / WhatsApp contact links; these are **not active** in this review version.
- Avoid uploading title deeds, personal IDs or scans with personal data to this public repo.

## Editing content

Update listing data and prices in `js/main.js` in the `listings` array. General text is in `index.html`; colors and layout are in `css/style.css`.

## Accuracy notes

- Alona rural road is **nearby**, not claimed as a registered access road.
- Alithinou price covers the full ownership of parcel 818 and half-shares in 817 and 819. 3,513 m² is the full combined land area, not 100% individually owned.
- Polystypos is advertised as sale of **100%**, since both co-owners intend to sell.
- No property photos or cadastral boundary images were supplied as accessible source files for this export; no map boundaries were invented.
