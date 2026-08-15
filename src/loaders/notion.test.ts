// @ts-expect-error -- Bun runs this test; the site does not ship Bun's ambient types.
import { describe, expect, test } from "bun:test";
import { assertUniqueSlugs, mapNotionPage, queryPublishedPages } from "./notion";

const page = (slug = "nota-publica"): Parameters<typeof mapNotionPage>[0] => ({
	id: "page-id",
	public_url: "https://example.notion.site/nota-publica",
	properties: {
		Curso: { select: null, type: "select" },
		Descripción: { rich_text: [{ plain_text: "Descripción" }], type: "rich_text" },
		Fecha: { date: { start: "2026-08-12" }, type: "date" },
		Orden: { number: null, type: "number" },
		Slug: { rich_text: [{ plain_text: slug }], type: "rich_text" },
		Name: { title: [{ plain_text: "Nota pública" }], type: "title" },
	},
});

describe("Notion notes", () => {
	test("maps a public page", () => {
		const note = mapNotionPage(page());
		expect(note).toMatchObject({
			description: "Descripción",
			externalUrl: "https://example.notion.site/nota-publica",
			id: "nota-publica",
			title: "Nota pública",
		});
		expect(() => mapNotionPage({ ...page(), public_url: null })).toThrow(
			"must be published to the web",
		);
	});

	test("maps and validates course lessons", () => {
		const lesson = page();
		lesson.properties.Curso = { select: { name: "ios-bootcamp" }, type: "select" };
		lesson.properties.Orden = { number: 1, type: "number" };
		expect(mapNotionPage(lesson)).toMatchObject({ course: "ios-bootcamp", order: 1 });

		lesson.properties.Orden = { number: 0, type: "number" };
		expect(() => mapNotionPage(lesson)).toThrow("positive integer Orden");
		lesson.properties.Orden = { number: 1.5, type: "number" };
		expect(() => mapNotionPage(lesson)).toThrow("positive integer Orden");
		lesson.properties.Curso = { select: { name: "iOS Bootcamp" }, type: "select" };
		expect(() => mapNotionPage(lesson)).toThrow("invalid Curso slug");
	});

	test("rejects incomplete or incorrectly typed course properties", () => {
		const withoutOrder = page();
		withoutOrder.properties.Curso = { select: { name: "ios-bootcamp" }, type: "select" };
		expect(() => mapNotionPage(withoutOrder)).toThrow("positive integer Orden");

		const withoutCourse = page();
		withoutCourse.properties.Orden = { number: 1, type: "number" };
		expect(() => mapNotionPage(withoutCourse)).toThrow("has Orden but no Curso");

		const wrongCourseType = page();
		wrongCourseType.properties.Curso = { type: "rich_text" };
		expect(() => mapNotionPage(wrongCourseType)).toThrow('"Curso" must be a Select');

		const wrongOrderType = page();
		wrongOrderType.properties.Orden = { type: "rich_text" };
		expect(() => mapNotionPage(wrongOrderType)).toThrow('"Orden" must be a Number');
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
