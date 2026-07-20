import rss from "@astrojs/rss";
import { getNotes } from "@/data/content";
import { entrySlug, paths } from "@/i18n";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const notes = await getNotes("es");
	return rss({
		description: "Notas de aprendizaje de Fernando Tello Studio",
		items: notes.map((note) => ({
			link: `${paths.es.notes}${entrySlug(note.id)}/`,
			pubDate: note.data.publishDate,
			title: note.data.title,
		})),
		site: siteConfig.url,
		title: `${siteConfig.title} — Notas`,
	});
};
