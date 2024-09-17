# TPL Barcode Generator

TPL Barcode Generator is a tool that generates phone wallpapers that double as digital Toronto Public Library cards. A digital version of your library card can be useful if you want to lighten your wallet or avoid forgetting your physical card.

This tool was made using Remix and Flowbite, and is hosted on Cloudflare Pages. I'm currently in the process of recoding this project as a static application so that it can be hosted on Cloudflare CDN, for free.

[tpl-barcode.pages.dev/](https://tpl-barcode.pages.dev/)

## Original Remix + Cloudflare README Information...

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
