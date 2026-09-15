# Google Review Assistant

A mobile-first React + Vite + Tailwind page for NFC-triggered Google review flows.
Tap the card → pick stars → tap what stood out → get a short AI-drafted
review → copy it and land on your Google review page.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL, then resize your browser (or open dev tools'
device toolbar) to check phone widths from 360px up.

Build for production:

```bash
npm run build
```

## Customize for a business

Everything business-specific lives in **`src/config.js`**:

```js
export const businessConfig = {
  name: 'Spice Route Kitchen',
  tagline: 'Share your experience',
  logoUrl: null, // or '/logo.png'
  googleReviewUrl: 'https://g.page/r/<place-id>/review',
  accentHex: '#0F9D74',
}
```

- **`googleReviewUrl`** — get this from Google Business Profile →
  "Ask for reviews" → copy the short link. This is the only URL the app
  ever opens; it never touches Google's page programmatically.
- **`accentHex`** — for reference/branding docs. The actual colors the UI
  renders come from the CSS variables at the top of `src/index.css`:

  ```css
  :root {
    --accent: #0f9d74;
    --accent-soft: #e6f4ef; /* light tint used behind selections */
    --accent-ink: #0b7a58; /* darker shade used for text on light fills */
  }
  ```

  Update all three together so contrast stays correct.

## Connect a real AI model

Review text is currently generated locally in
**`src/utils/generateReview.js`** by `generateReview()` — no API key
needed, works offline. To wire up a real model, replace the body of that
function with a call to your backend endpoint; the function signature and
the rest of the app stay unchanged. A commented example is included at the
bottom of that file. Keep any API key server-side — never call a model
provider directly from the browser bundle.

## Structure

```
src/
  App.jsx                     orchestrates the flow + layout
  config.js                   business name, logo, Google URL, accent
  index.css                   Tailwind layers + accent CSS variables
  components/
    BusinessHeader.jsx
    StarRating.jsx
    ExperienceTags.jsx
    OptionalNote.jsx
    GenerateButton.jsx
    ReviewResult.jsx
  utils/
    generateReview.js         mock generator + real-API hookup point
```
