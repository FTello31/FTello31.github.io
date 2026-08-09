import rss from "@astrojs/rss";
import { getNotes } from "@/data/content";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const notes = await getNotes();
	return rss({
		description: "Learning notes by Fernando Tello Studio",
		items: notes.map((note) => ({
			link: `/notes/${note.id}/`,
			pubDate: note.data.publishDate,
			title: note.data.title,
		})),
		site: siteConfig.url,
		title: `${siteConfig.title} - Notes`,
	});
};
