# MyFundingMachine.com redesign

A static redesign of [myfundingmachine.com](https://myfundingmachine.com): the homepage and every public page. It uses the live site's blue palette and Inter, built to the craft level of Linear, Stripe and Ramp. The copy and claims come from the live site unchanged.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | Homepage. |
| `pricing.html` | Plans, fees and the 0% card rates table. |
| `about.html` | Company story, stats, awards and social links. |
| `blog.html` | The latest four posts, linking to blog.myfundingmachine.com. |
| `masterclass.html` / `masterclass-video.html` | Masterclass registration form and the video page it redirects to. |
| `live-events.html` | Funding Machine Live 2027: countdown, venue, speakers, tickets, schedule, FAQ. |
| `contact.html` / `book-demo.html` | Contact details and the booking calendar embed. |
| `privacy.html` / `terms-of-service.html` | Legal pages with an "On this page" contents list. |
| `assets/css/site.css` | All styles. Design tokens (colors, type, spacing, motion) are CSS custom properties at the top. |
| `assets/js/site.js` | Small progressive enhancements: mobile nav, the calculator, the scroll stepper fallback, video players, event countdowns, schedule tabs, speaker bio toggles and the masterclass form. Pages work without it, except form submission. |
| `assets/img/` | Logo, product frames, testimonial thumbnails, award, venue and speaker photos (WebP). Each `.json` sidecar records where its image came from. |
| `assets/fonts/inter.woff2` | Self-hosted Inter (variable). |
| `DESIGN.md` | The design system: color, type, components, spacing, motion and accessibility rules. Start here to extend or port the design. |
| `PRODUCT.md` | Product context: audience (brokers), primary action (Book a Demo), brand voice, and the facts and claims the page may use. |

## Preview

Live: https://brock-fundingmachine.github.io/myfundingmachine-redesign/

Or open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes for porting (e.g. into GoHighLevel)

- Primary call to action: **Book a Demo**. Secondary: Sign in.
- Filled buttons and links use blue-600 `oklch(0.546 0.215 262.9)` so white text passes WCAG AA. Don't use the lighter brand blue for text on white.
- The "How it works" stepper uses CSS scroll-driven animations, with an IntersectionObserver fallback in `site.js`.
- Respects `prefers-reduced-motion`.
- Every page shares one header, footer and event bar (the bar is hidden on `live-events.html`, which is the event page). Plain HTML, no build step.
- **The masterclass form is live.** It posts to the same LeadConnector form as the current site, so every submission creates a real lead in GHL. Don't test it with fake data.
- The booking calendar (`contact.html`, `book-demo.html`) and the Vimeo videos load in normal browsers; automated/headless browsers are blocked by Cloudflare. A "Calendar not loading?" link opens the calendar directly.
- `blog.html` is a snapshot of the latest four posts; it doesn't update itself.
- Button labels outside the event pages are normalized to **Book a Demo**. Event buttons keep their original wording ("Secure Your Spot Now").
- Canonical URLs point at myfundingmachine.com, not the GitHub Pages preview.
