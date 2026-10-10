# dfts-team (sample product)

A small "Team Hub" app that consumes the [DFTS design system](https://github.com/chris-antonio/dfts-react)
through its npm package. It exists to test design system health tooling (e.g. DSDoc): it uses about 19 DFTS
components and keeps a few native HTML controls on purpose (`src/legacy/LegacyToolbar.jsx`) so
component coverage is below 100%.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Dependency

`package.json` installs the design system straight from GitHub so it works before the package is published:

```json
"@chris-antonio/dfts-react": "github:chris-antonio/dfts-react"
```

Once you have published it to npm, switch to a version range (this is what lets tools tell when this
app falls behind the latest release):

```json
"@chris-antonio/dfts-react": "^0.1.0"
```

## Experiments for the health dashboard

- Migrate `LegacyToolbar` to `TextField` / `Button` → coverage goes up.
- Publish a new DFTS release (`0.2.0`) and leave this app on `^0.1.0` → it shows as outdated.
- Remove the package from `package.json` in a copy of this repo → adoption drops.
