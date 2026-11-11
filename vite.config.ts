import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type UserConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { blogMetadata } from "./tooling/vite-plugins/blogMetadata.ts";
import Macros from "unplugin-macros/vite";
import devAdapter from '@sveltejs/adapter-node'
import { mdsvex } from 'mdsvex'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      extensions: ['.svelte', '.svx', '.md'],
      experimental: {
        forkPreloads: true,
        handleRenderingErrors: false,
        instrumentation: {
          server: true
        },
        remoteFunctions: true,
        tracing: {server: true}
      },
      csp: {
        mode: 'auto'
      },
      alias: {
        $assets: './src/lib/assets',
        $components: './src/lib/components',
        $data: './src/lib/data',
        $lib: './src/lib',
        $paraglide: './src/lib/i18n/paraglide',
        $stores: './src/lib/data/stores',
        $styles: './src/lib/styles',
        $tooling: './tooling'
      },
      adapter: devAdapter({
        precompress: true
      }),
      preprocess: [
        vitePreprocess(),
        mdsvex({
          extensions: ['.svx', '.md'],
        })
      ]
    }),
    tailwindcss(),
    ViteImageOptimizer(),
    paraglideVitePlugin({
      cookieName: "MINIKRAKEN_LOCALE",
      outdir: "./src/lib/i18n/paraglide",
      project: "./src/lib/i18n/paraglide.inlang",
      strategy: ["cookie", "preferredLanguage", "url", "baseLocale"],
      urlPatterns: [
        {
          localized: [
            ["en", "/en/about-us"],
            ["nl", "/over-ons"],
          ],
          pattern: "/about",
        },
        {
          localized: [
            ["en", "/en/process"],
            ["nl", "/proces"],
          ],
          pattern: "/process",
        },
        {
          localized: [
            ["en", "/en/realisations"],
            ["nl", "/realisaties"],
          ],
          pattern: "/realisations",
        },
        {
          localized: [
            ["en", "/en/contact-us"],
            ["nl", "/contacteer-ons"],
          ],
          pattern: "/contact",
        },
        {
          localized: [
            ["en", "/sitemap.xml"],
            ["nl", "/sitemap.xml"], // Same path for all locales
          ],
          pattern: "/sitemap.xml",
        },
        {
          localized: [
            ["en", "/api/:path(.*)?"],
            ["nl", "/api/:path(.*)?"],
          ],
          pattern: "/api/:path(.*)?",
        },
        {
          localized: [
            ["en", "/en/:path(.*)?"],
            ["nl", "/:path(.*)?"],
          ],
          pattern: "/:path(.*)?",
        },
      ],
    }),
    Macros(),
    blogMetadata(),
  ] as UserConfig["plugins"],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
  ssr: {
    noExternal: [
      "devalue",
      "cookie",
      "set-cookie-parser",
      "clsx",
      "nope-id",
      "posthog-js",
      "resend",
      "motion",
    ],
  }
});
