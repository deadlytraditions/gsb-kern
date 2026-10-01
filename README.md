# GSB KERN (`gsb_kern`)

KERN UX frontend layer for GSB 11 (TYPO3 13.4, `itzbund/gsb-core`). It replaces the Bootstrap-based GSB public
frontend with [KERN UX](https://www.kern-ux.de/) markup (`@kern-ux/native`) without modifying GSB: everything is
added on top via a site set, TypoScript, Fluid template paths, TSconfig and TCA overrides.

Independent project, not part of GSB/ITZBund or the KERN team.

## What it provides

- **Page chrome** (KERN has no navigation/header components yet): Kopfzeile, skip links, header with portal name,
  service/language links, search field (large screens), main navigation (collapsible on small screens), breadcrumb,
  section navigation, footer.
- **Page templates** per backend layout: `Home`, `TwoColumns` (both with sidebar colPos 3), GSB's `Default` and
  `OneColArticle`. colPos follow GSB (0 Top, 1 Main, 2 Bottom as a full-width band).
- **Content elements** (fluid_styled_content + GSB) and **containers** (accordion, tabs → accordion, grid, slider →
  stacked) in KERN markup; `frame_class` `box-info|success|warning|danger` → KERN alert, `surface` → tinted block.
- **EXT:form** templates in KERN markup (`Configuration/Form/KernFormSetup.yaml`, YAML index 130).
- **Search** (optional, `itzbund/gsb-solr`): the search page as KERN
  [search component](https://www.kern-ux.de/komponenten/search) with result list and pagination
  (`Resources/Private/Solr`). Facets, sorting and suggestions are switched off (`40.Solr.typoscript`); results only
  appear after a search.
- **Print styles** (browser print / "save as PDF"): content and brand without navigation, banner and footer menus;
  external links show their address, accordions are opened for printing.
- **CKEditor preset** `gsb_kern` (h2–h4, styles intro text / warning / link list / button), RTE tables → KERN table.
- **KERN assets** bundled locally (no CDN): `Resources/Public/Vendor/kern`, updated by `Build/kern-update.sh`
  (pinned version + SHA-256).

## Installation

```bash
composer require deadlytraditions/gsb-kern
```

Let the site (or your tenant's site set) depend on the set `deadlytraditions/gsb-kern`; it depends on `itzbund-gsb/default`.

| Setting | Purpose |
|---|---|
| `gsbKern.navigation.legal-page` | Folder whose pages (Impressum, Datenschutz) form the second footer menu |

GSB settings used: `navigation.*` (main, meta, footer menus), `search.search-page`, `accessability.*Page` (icons in
the service navigation), `colors.background.*` (teaser tiles, `--gk-bg-color-N`), `favicons.*`.

## Theming a tenant

Add a stylesheet after the layer's CSS (TypoScript `page.includeCSS`, any key defined later) and set the tokens:

```css
:root {
    --gk-color-brand: #993a4c;          /* header bar, footer, accents, KERN action colour */
    --gk-color-brand-dark: #7a2e3d;     /* hover of brand buttons */
    --gk-color-brand-visited: #6b2835;  /* visited links */
    --gk-color-on-brand: #fff;          /* text on brand */
    --gk-color-tint: #fbf1d5;           /* breadcrumb bar, hover, table stripes, surface frames */
    --gk-color-line: #e6e6e6;
    --gk-color-band: #e6e6e6;           /* Bottom column band */
    --gk-color-warning: #b24a24;        /* RTE style "warning" */
    --gk-color-warning-tint: #fbe9e2;
    --gk-font-sans: "Fira Sans", Arial, sans-serif;
    --gk-font-display: Georgia, serif;  /* portal name, page title */
}

/* optional: text colour per teaser tile colour (GSB background colours) */
.gk-tile--color_4 { --gk-tile-fg: #fff; }

/* optional: retint the boxes via KERN's feedback tokens */
.gk-box.kern-alert--info { --kern-color-feedback-info-contextual: #007a82; }
```

Defaults are KERN's light theme; the brand tokens are fed into KERN's own tokens (action, visited, decorative brand,
font family). Check contrast (≥ 4.5:1) of brand on white and on tint.

**Texts:** portal name, subtitle and footer publisher are the labels `brand.title`, `brand.subtitle` and
`footer.publisher` (fallback: the site's `websiteTitle`). Set them via `locallangXMLOverride` in the tenant's
`ext_localconf.php`:

```php
$GLOBALS['TYPO3_CONF_VARS']['SYS']['locallangXMLOverride']['EXT:gsb_kern/Resources/Private/Language/locallang.xlf'][]
    = 'EXT:my_sitepackage/Resources/Private/Language/Overrides/gsb_kern.xlf';
$GLOBALS['TYPO3_CONF_VARS']['SYS']['locallangXMLOverride']['de']['EXT:gsb_kern/Resources/Private/Language/locallang.xlf'][]
    = 'EXT:my_sitepackage/Resources/Private/Language/Overrides/de.gsb_kern.xlf';
```

**Templates:** override single templates/partials with higher root path indexes than the layer's
(page `page.10.*RootPaths.200`, content `lib.contentElement`/`lib.gsbContentElement`/`lib.containerContentElement`
`*RootPaths.500`, form `300`), e.g. `Page/Partials/Brand.html` for a logo.

## Updating KERN

Bump `VERSION` and `SHA256` in `Build/kern-update.sh`, run it, check the frontend. KERN is licensed under EUPL-1.2
(`Resources/Public/Vendor/kern/LICENSE.md`).

## License

GPL-3.0-or-later (as GSB).
