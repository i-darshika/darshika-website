# Darshika website

Portfolio website built with Next.js, React, Tailwind CSS and Lenis.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Checks and production build

```sh
npm run lint
npm run build
```

The static website is exported to `out/`. Cloudflare Pages builds and deploys pushes to `main` using `npm run build` and the `out` directory.

## Project files

- `src/app/`: pages, layouts and shared styles.
- `src/components/`: reusable interface components.
- `src/data/`: website copy, blog content and portfolio data.
- `public/wp/`: referenced images and media.
- `public/_redirects`: redirects for legacy URLs.

The contact form uses FormSubmit. Its recipient address is configured in `src/data/site.ts`.

`node_modules/`, `.next/`, `out/` and `*.tsbuildinfo` are generated locally and excluded from Git. Keep `package-lock.json` for reproducible installs.
