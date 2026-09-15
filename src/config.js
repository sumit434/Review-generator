// ── Per-business configuration ──────────────────────────────────────────
// Change these values to re-point this page at a different business.
// Nothing else in the app needs to change.

export const businessConfig = {
  name: 'Spice Route Kitchen',
  tagline: 'Share your experience',
  // Path to a logo image, or null to show the initial-letter placeholder.
  logoUrl: null,

  // The Google review link for THIS business. Get this from Google Business
  // Profile → Ask for reviews → Share review form.
  // Format is typically: https://g.page/r/<your-place-id>/review
  googleReviewUrl: 'https://g.page/r/REPLACE_WITH_PLACE_ID/review',

  // Accent color the app is themed around. Update src/index.css :root
  // variables (--accent, --accent-soft, --accent-ink) to match exactly,
  // since Tailwind reads them from there for both fills and text.
  accentHex: '#0F9D74',
}
