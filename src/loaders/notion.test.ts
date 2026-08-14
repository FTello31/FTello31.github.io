// @ts-expect-error -- Bun runs this test; the site does not ship Bun's ambient types.
import { describe, expect, test } from "bun:test";
import {
	assertUniqueSlugs,
	mapNotionPage,
	queryPublishedPages,
	validateNotionMarkdown,
} from "./notion";

const page = (slug = "nota-publica") => ({
	id: "page-id",
	properties: {
		Descripción: { rich_text: [{ plain_text: "Descripción" }], type: "rich_text" },
		Fecha: { date: { start: "2026-08-12" }, type: "date" },
		Slug: { rich_text: [{ plain_text: slug }], type: "rich_text" },
		Name: { title: [{ plain_text: "Nota pública" }], type: "title" },
	},
});

describe("Notion notes", () => {
	test("maps and validates publishable content", () => {
		const note = mapNotionPage(page());
		expect(note).toMatchObject({
			description: "Descripción",
			id: "nota-publica",
			title: "Nota pública",
		});
		expect(() =>
			validateNotionMarkdown(note, {
				markdown: "## Contenido\n\n- uno\n- dos",
				truncated: false,
				unknown_block_ids: [],
			}),
		).not.toThrow();
		expect(() =>
			validateNotionMarkdown(note, {
				markdown: "![privada](https://example.com/image.jpg)",
				truncated: false,
				unknown_block_ids: [],
			}),
		).toThrow("unsupported media");
		expect(() =>
			validateNotionMarkdown(note, {
				markdown: '<mention-page url="https://notion.so/private">Privada</mention-page>',
				truncated: false,
				unknown_block_ids: [],
			}),
		).toThrow("unsupported media");
	});

	test("rejects invalid and duplicate slugs", () => {
		expect(() => mapNotionPage(page("Slug con espacios"))).toThrow("invalid Slug");
		const note = mapNotionPage(page());
		expect(() => assertUniqueSlugs([note, note])).toThrow("Duplicate Notion Slug");
	});

	test("queries every page with the publication filter", async () => {
		const bodies: Record<string, unknown>[] = [];
		const fetcher = (async (_input: RequestInfo | URL, init?: RequestInit) => {
			bodies.push(JSON.parse(String(init?.body)));
			const first = bodies.length === 1;
			return Response.json({
				has_more: first,
				next_cursor: first ? "next" : null,
				results: [page(first ? "primera" : "segunda")],
			});
		}) as typeof fetch;

		const pages = await queryPublishedPages("source", "token", fetcher);
		expect(pages).toHaveLength(2);
		expect(bodies[0]).toMatchObject({
			filter: { checkbox: { equals: true }, property: "Publicar" },
			page_size: 100,
			result_type: "page",
		});
		expect(bodies[1]).toMatchObject({ start_cursor: "next" });
	});

	test("surfaces API failures without exposing the token", async () => {
		const fetcher = (async () => new Response("Unauthorized", { status: 401 })) as typeof fetch;
		const request = queryPublishedPages("source", "secret-token", fetcher);
		await expect(request).rejects.toThrow("Notion API 401: Unauthorized");
		await expect(request).rejects.not.toThrow("secret-token");
	});
});
