# @appsfortableau/extension-host

Run Apps for Tableau extensions (SuperTables and more) on any web page, without Tableau. The page
passes its own rows; the extension runs from your Apps for Tableau subscription.

This repository contains compiled builds only.

## Script tag

```html
<div id="table" style="height:520px"></div>
<script src="https://cdn.jsdelivr.net/gh/appsfortableau/aft-extension-host@v0.1.4/dist/extension-host.iife.js"></script>
<script>
  AFTExtensions.mount(document.getElementById('table'), {
    url: 'https://extensions-appsfortableau.infotopics.com/login/<your-token>/', // from the portal
    extension: { id: 'super-tables', encodings: [{ id: 'dimensions', measures: false }, { id: 'measures', measures: true }] },
    data: [{ Region: 'Europe', Sales: 1200 }, { Region: 'Americas', Sales: 950 }],
    storageKey: 'my-dashboard:supertables',
    onSelect: (rows) => console.log('selected', rows),
  });
</script>
```

## ES module

```bash
npm install github:appsfortableau/aft-extension-host#v0.1.4
```

```js
import { mount, getEncodings } from '@appsfortableau/extension-host';
```

- `getEncodings(url)` returns the extension's encodings (which fields it takes).
- `mount(el, options)` returns a viz with `setData`, `setMode`, `configure`, `getSettings` and
  `destroy`. All options are typed in `dist/types/index.d.ts`.

Releases are git tags (`v0.1.4`, …). Always pin a tag in production URLs.
