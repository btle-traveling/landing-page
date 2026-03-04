import { defineField, defineType } from "sanity";

export const postType = defineType({
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "image",
			type: "image",
			description: "Cover image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "body",
			type: "array",
			of: [{ type: "block" }, { type: "image" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "language",
			type: "string",
			description: "Language of the post",
			initialValue: "uz",
			options: {
				list: [
					{ value: "uz", title: "Uzbek" },
					{ value: "en", title: "English" },
					{ value: "ru", title: "Russian" },
				],
			},
			validation: (rule) => rule.required(),
		}),
	],
});
