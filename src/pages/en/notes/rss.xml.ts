import rss from "@astrojs/rss";
import { getNotes } from "@/data/content";
import { entrySlug, paths } from "@/i18n";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const notes = await getNotes("en");
	return rss({
		description: "Learning notes by Fernando Tello Studio",
		items: notes.map((note) => ({
			link: `${paths.en.notes}${entrySlug(note.id)}/`,
			pubDate: note.data.publishDate,
			title: note.data.title,
		})),
		site: siteConfig.url,
		title: `${siteConfig.title} — Notes`,
	});
};
