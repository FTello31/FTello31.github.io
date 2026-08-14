import type { Loader } from "astro/loaders";

const API_URL = "https://api.notion.com/v1";
const API_VERSION = "2026-03-11";
const forbiddenContent =
	/!\[[^\]]*\]\(|<(?:audio|callout|column|columns|database|details|empty-block|file|mention-|page|pdf|synced_block|table_of_contents|unknown|video)\b|https?:\/\/(?:www\.)?notion\.(?:com|site|so)\b/i;

type Fetcher = typeof fetch;
type RichText = { plain_text: string };
type Property = {
	checkbox?: boolean;
	date?: { start: string } | null;
	rich_text?: RichText[];
	title?: RichText[];
	type: string;
};
type NotionPage = {
	id: string;
	properties: Record<string, Property>;
};
type QueryResponse = {
	has_more: boolean;
	next_cursor: string | null;
	results: NotionPage[];
};
type MarkdownResponse = {
	markdown: string;
	truncated: boolean;
	unknown_block_ids: string[];
};

export interface NotionNote extends Record<string, unknown> {
	description?: string;
	id: string;
	publishDate: Date;
	title: string;
}

function text(property: Property | undefined, type: "rich_text" | "title") {
	if (!property || property.type !== type) return undefined;
	return (
		property[type]
			?.map((part) => part.plain_text)
			.join("")
			.trim() || undefined
	);
}

export function mapNotionPage(page: NotionPage): NotionNote {
	const title = text(
		Object.values(page.properties).find((property) => property.type === "title"),
		"title",
	);
	const id = text(page.properties.Slug, "rich_text");
	const description = text(page.properties.Descripción, "rich_text");
	const date = page.properties.Fecha;
	if (!title) throw new Error(`Notion page ${page.id} is missing its title.`);
	if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
		throw new Error(`Notion page "${title}" has an invalid Slug.`);
	}
	if (date?.type !== "date" || !date.date?.start) {
		throw new Error(`Notion page "${title}" is missing Fecha.`);
	}
	const publishDate = new Date(date.date.start);
	if (Number.isNaN(publishDate.getTime())) {
		throw new Error(`Notion page "${title}" has an invalid Fecha.`);
	}
	return {
		...(description && { description }),
		id,
		publishDate,
		title,
	};
}

export function validateNotionMarkdown(note: NotionNote, response: MarkdownResponse) {
	if (response.truncated || response.unknown_block_ids.length > 0) {
		throw new Error(`Notion page "${note.title}" contains truncated or inaccessible content.`);
	}
	if (forbiddenContent.test(response.markdown)) {
		throw new Error(`Notion page "${note.title}" contains unsupported media or child content.`);
	}
}

export function assertUniqueSlugs(notes: NotionNote[]) {
	const ids = new Set<string>();
	for (const note of notes) {
		if (ids.has(note.id)) throw new Error(`Duplicate Notion Slug: ${note.id}`);
		ids.add(note.id);
	}
}

async function request<T>(path: string, token: string, fetcher: Fetcher, init?: RequestInit) {
	const response = await fetcher(`${API_URL}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"Notion-Version": API_VERSION,
		},
	});
	if (!response.ok) {
		const detail = (await response.text()).slice(0, 300);
		throw new Error(`Notion API ${response.status}: ${detail || response.statusText}`);
	}
	return (await response.json()) as T;
}

export async function queryPublishedPages(
	dataSourceId: string,
	token: string,
	fetcher: Fetcher = fetch,
) {
	const pages: NotionPage[] = [];
	let startCursor: string | undefined;
	do {
		const response = await request<QueryResponse>(
			`/data_sources/${dataSourceId}/query`,
			token,
			fetcher,
			{
				body: JSON.stringify({
					filter: { checkbox: { equals: true }, property: "Publicar" },
					page_size: 100,
					result_type: "page",
					...(startCursor && { start_cursor: startCursor }),
				}),
				method: "POST",
			},
		);
		pages.push(...response.results);
		startCursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
	} while (startCursor);
	return pages;
}

export function notionNoteLoader(options: {
	dataSourceId: string | undefined;
	fetcher?: Fetcher;
	token: string | undefined;
}): Loader {
	return {
		name: "notion-notes",
		async load({ generateDigest, logger, parseData, renderMarkdown, store }) {
			const { dataSourceId, fetcher = fetch, token } = options;
			if (!token && !dataSourceId) {
				logger.warn("Notion notes disabled: NOTION_TOKEN and NOTION_DATA_SOURCE_ID are not set.");
				store.clear();
				return;
			}
			if (!token || !dataSourceId) {
				throw new Error("NOTION_TOKEN and NOTION_DATA_SOURCE_ID must both be set.");
			}

			logger.info("Loading published notes from Notion");
			const pages = await queryPublishedPages(dataSourceId, token, fetcher);
			const notes = pages.map(mapNotionPage);
			assertUniqueSlugs(notes);
			const entries = [];
			for (const [index, page] of pages.entries()) {
				const note = notes[index];
				if (!note) throw new Error(`Notion page ${page.id} could not be mapped.`);
				const response = await request<MarkdownResponse>(
					`/pages/${page.id}/markdown`,
					token,
					fetcher,
				);
				validateNotionMarkdown(note, response);
				const data = await parseData({ id: note.id, data: note });
				entries.push({
					body: response.markdown,
					data,
					digest: generateDigest(response.markdown),
					id: note.id,
					rendered: await renderMarkdown(response.markdown),
				});
			}

			store.clear();
			for (const entry of entries) store.set(entry);
		},
	};
}
