import { defineConfig } from "vitepress";

export default defineConfig({
	title: "useFiles",
	description:
		"Learn how to add, replace, and manage files with useFiles React hook.",
	base: "/useFiles/", // sets the base path for the site

	themeConfig: {
		sidebar: [
			{
				text: "Introduction",
				items: [
					{ text: "Getting Started", link: "/" },
					{ text: "Example", link: "/example" },
				],
			},
			{
				text: "API",
				items: [
					{ text: "Parameters", link: "/parameters" },
					{ text: "Add Files", link: "/add-files" },
					{ text: "Find Files", link: "/find-files" },
					{ text: "Remove Files", link: "/remove-files" },
					{ text: "Utility Functions", link: "/utility-functions" },
				],
			},
			{
				text: "Other",
				items: [{ text: "License", link: "/license" }],
			},
		],
	},
	appearance: "dark",
});
