# MyFundingMachine.com homepage redesign

A static redesign of the [myfundingmachine.com](https://myfundingmachine.com) homepage. It uses the live site's blue palette and Inter, built to the craft level of Linear, Stripe and Ramp. The copy and claims come from the live site unchanged.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The whole homepage: one page, no build step, no framework. |
| `assets/css/site.css` | All styles. Design tokens (colors, type, spacing, motion) are CSS custom properties at the top. |
| `assets/js/site.js` | Small progressive enhancements: mobile nav, the Funding Machine vs. 0% card calculator, the scroll stepper fallback, and video players. The page works without it. |
| `assets/img/` | Logo, product frames taken from the demo video, testimonial thumbnails and award photos (WebP). Each `.json` sidecar records where its image came from. |
| `assets/fonts/inter.woff2` | Self-hosted Inter (variable). |
| `DESIGN.md` | The design system: color, type, components, spacing, motion and accessibility rules. Start here to extend or port the design. |
| `PRODUCT.md` | Product context: audience (brokers), primary action (Book a Demo), brand voice, and the facts and claims the page may use. |

## Preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes for porting (e.g. into GoHighLevel)

- Primary call to action: **Book a Demo**. Secondary: Sign in.
- Filled buttons and links use blue-600 `oklch(0.546 0.215 262.9)` so white text passes WCAG AA. Don't use the lighter brand blue for text on white.
- The "How it works" stepper uses CSS scroll-driven animations, with an IntersectionObserver fallback in `site.js`.
- Respects `prefers-reduced-motion`.
