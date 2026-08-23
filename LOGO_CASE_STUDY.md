# Righteous Logo Case Study

## Reference translation

The reference image uses a warm gold, editorial wordmark on a quiet luxury background:

- A double-ring circular crest with an italic `R`.
- The name `RIGHTEOUS` in a high-contrast serif.
- `SCARVES & ACCESSORIES` as a small, widely tracked uppercase subtitle.
- Gold is defined by the existing brand token `$richgold` (`#b68a3d`).

The logo is an SVG so the shape stays crisp at header, loader, and future print or social sizes. Its text and geometry are intentionally readable in the source file, making it easy to adjust without redrawing a bitmap.

## Where it lives

`Icons/righteous-logo.svg` is the single source of truth for the mark.

Every page header references it with:

```html
<img class="brand-logo" src="/Icons/righteous-logo.svg" alt="Righteous Scarves and Accessories">
```

The class is styled in `Styles/header.scss`. The absolute URL works consistently from every MPA page, including nested routes served by Vite.

## Loading experience

`Scripts/main.js` owns the shared loading behavior because all page entry points import it directly or indirectly.

1. `setupLoadingExperience()` creates `.site-loader` and inserts it at the start of `<body>`.
2. The same SVG is shown inside `.site-loader__logo`.
3. `.site-loader__bar` animates inside `.site-loader__track` while the page loads.
4. The window `load` event adds `.is-ready`, which fades the overlay out and disables pointer events.
5. Internal links to another `.html` page remove `.is-ready` before navigation, so the next page transition has a branded loading state too.

The visual rules live in `Styles/_loading.scss`, included once from `Styles/main.scss`. Reduced-motion users receive a static full bar instead of the animation.

## Reuse pattern

For another project, copy the same three-part structure:

```text
asset:      one SVG/PNG source of truth
component:  one shared logo markup pattern
lifecycle:  one loader controller and one stylesheet
```

If the logo changes, edit the SVG once. If the loading timing or animation changes, edit `setupLoadingExperience()` and `_loading.scss`; page templates do not need to change.
