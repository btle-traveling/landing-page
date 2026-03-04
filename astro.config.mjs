// @ts-check

import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		react(),
		playformCompress(),
		sanity({
			projectId: "vwbu57gz",
			dataset: "production",
			useCdn: false,
			studioBasePath: "/admin",
		}),
	],
	env: {
		schema: {
			APP_URL: envField.string({
				access: "public",
				context: "client",
			}),
			POSTHOG_PROJECT_ID: envField.string({
				access: "public",
				context: "client",
			}),
			NODE_ENV: envField.string({
				access: "public",
				context: "client",
			}),
		},
	},
	i18n: {
		locales: ["en", "uz", "ru"],
		defaultLocale: "en",
	},
});
