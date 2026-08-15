import type { Loader } from "astro/loaders";

const API_URL = "https://api.notion.com/v1";
const API_VERSION = "2026-03-11";

type Fetcher = typeof fetch;
type RichText = { plain_text: string };
type Property = {
	checkbox?: boolean;
	date?: { start: string } | null;
	number?: number | null;
	rich_text?: RichText[];
	select?: { name: string } | null;
	title?: RichText[];
	type: string;
};
type NotionPage = {
	id: string;
	properties: Record<string, Property>;
	public_url: string | null;
};
type QueryResponse = {
	has_more: boolean;
	next_cursor: string | null;
	results: NotionPage[];
};
export interface NotionNote extends Record<string, unknown> {
	course?: string;
	description?: string;
	externalUrl: string;
	id: string;
	order?: number;
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
	const courseProperty = page.properties.Curso;
	const orderProperty = page.properties.Orden;
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
	if (!page.public_url) {
		throw new Error(`Notion page "${title}" must be published to the web.`);
	}
	if (courseProperty?.type !== "select") {
		throw new Error(`Notion property "Curso" must be a Select.`);
	}
	if (orderProperty?.type !== "number") {
		throw new Error(`Notion property "Orden" must be a Number.`);
	}
	const course = courseProperty.select?.name.trim();
	const order = orderProperty.number ?? undefined;
	if (course && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(course)) {
		throw new Error(`Notion page "${title}" has an invalid Curso slug.`);
	}
	if (course && (!Number.isInteger(order) || (order ?? 0) <= 0)) {
		throw new Error(`Notion page "${title}" requires a positive integer Orden.`);
	}
	if (!course && order !== undefined) {
		throw new Error(`Notion page "${title}" has Orden but no Curso.`);
	}
	return {
		...(course && { course }),
		...(description && { description }),
		externalUrl: page.public_url,
		id,
		...(order !== undefined && { order }),
		publishDate,
		title,
	};
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
		async load({ generateDigest, logger, parseData, store }) {
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
			for (const note of notes) {
				const data = await parseData({ id: note.id, data: note });
				entries.push({
					data,
					digest: generateDigest(JSON.stringify(note)),
					id: note.id,
				});
			}

			store.clear();
			for (const entry of entries) store.set(entry);
		},
	};
}
