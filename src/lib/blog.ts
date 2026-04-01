import { sanityClient } from "sanity:client";

export async function getBlogPosts(lang: string) {
	return await sanityClient.fetch(
		`*[_type == "post" && defined(slug) && language == $lang] | order(publishedAt desc)`,
		{ lang },
	);
}

export async function getBlogPost(slug: string) {
	return await sanityClient.fetch(
		`*[_type == "post" && slug.current == $slug][0]`,
		{ slug },
	);
}
