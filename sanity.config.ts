// sanity.config.ts

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postType } from "@/integrations/sanity/schema";

export default defineConfig({
	name: "project-name",
	title: "Btle",
	projectId: "vwbu57gz",
	dataset: "production",
	plugins: [structureTool()],
	schema: {
		types: [postType],
	},
});
