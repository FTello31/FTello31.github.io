import rss from "@astrojs/rss";
import { getPosts } from "@/data/content";
import { entrySlug, paths } from "@/i18n";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const posts = await getPosts("en");
	return rss({
		description: "Articles by Fernando Tello Studio",
		items: posts.map((post) => ({
			description: post.data.description,
			link: post.data.externalUrl ?? `${paths.en.blog}${entrySlug(post.id)}/`,
			pubDate: post.data.publishDate,
			title: post.data.title,
		})),
		site: siteConfig.url,
		title: `${siteConfig.title} — Blog`,
	});
};
