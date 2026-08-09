import { createClient } from "@sanity/client";
import type { Loader } from "astro/loaders";
import { certificateMetadata } from "@/data/certificateMetadata";
import type { Locale } from "@/types";

type Localized<T> = Record<Locale, T>;
type Entry = { data: Record<string, unknown>; id: string };
type SanityDocument = Record<string, unknown> & { _id: string };

const locales = ["es", "en"] as const;
const client = createClient({
	apiVersion: "2026-07-21",
	dataset: "production",
	projectId: "o9vp89lc",
	useCdn: false,
});

function localized<T>(value: Localized<T>, locale: Locale): T {
	return value[locale];
}

function splitPeriod(period: string) {
	const [startDate, endDate] = period.split(/\s+-\s+/, 2);
	return { endDate, startDate };
}

function sanityLoader(type: string, map: (document: SanityDocument) => Entry[]): Loader {
	return {
		name: `sanity-${type}`,
		async load({ generateDigest, logger, parseData, store }) {
			logger.info(`Loading ${type} documents from Sanity`);
			const documents = await client.fetch<SanityDocument[]>("*[_type == $type] | order(id asc)", {
				type,
			});
			store.clear();
			for (const document of documents) {
				for (const entry of map(document)) {
					const data = await parseData(entry);
					store.set({ ...entry, data, digest: generateDigest(data) });
				}
			}
		},
	};
}

export const articleLoader = () =>
	sanityLoader("article", (document) =>
		locales.map((lang) => ({
			id: `${lang}/${document.id}`,
			data: {
				description: localized(document.description as Localized<string>, lang),
				draft: false,
				externalUrl: document.link,
				imageUrl: document.imageUrl,
				lang,
				pinned: false,
				publishDate: new Date(`${document.year}-01-01T00:00:00Z`),
				tags: localized(document.tags as Localized<string[]>, lang),
				title: localized(document.title as Localized<string>, lang),
				translationKey: String(document.id),
			},
		})),
	);

export const projectLoader = () =>
	sanityLoader("project", (document) =>
		locales.map((lang) => ({
			id: `${lang}/${document.id}`,
			data: {
				description: localized(document.description as Localized<string>, lang),
				featured: true,
				imageUrl: document.image,
				lang,
				order: document.order,
				technologies: document.technologies,
				title: localized(document.title as Localized<string>, lang),
				translationKey: String(document.id),
				url: document.link,
			},
		})),
	);

export const experienceLoader = () =>
	sanityLoader("experience", (document) =>
		locales.map((lang) => {
			const period = localized(document.period as Localized<string>, lang);
			const { endDate, startDate } = splitPeriod(period);
			return {
				id: `${lang}/${document.id}`,
				data: {
					company: document.company,
					companyUrl: document.companyUrl,
					current: document.current,
					description: localized(document.description as Localized<string>, lang),
					endDate: document.current ? undefined : endDate,
					lang,
					order: document.order,
					role: localized(document.title as Localized<string>, lang),
					startDate,
					technologies: document.technologies,
					translationKey: String(document.id),
				},
			};
		}),
	);

export const certificateLoader = () =>
	sanityLoader("certificate", (document) => {
		const id = String(document.id);
		const metadata = certificateMetadata[id];
		return [
			{
				id,
				data: {
					credentialId: document.credentialId ?? metadata?.credentialId,
					credentialType: document.credentialType ?? metadata?.credentialType ?? "course",
					credentialUrl: document.credentialUrl,
					expirationDate:
						(document.expirationDate ?? metadata?.expirationDate)
							? new Date(`${String(document.expirationDate ?? metadata?.expirationDate)}T00:00:00Z`)
							: undefined,
					featured: document.featured,
					issueDate: new Date(`${String(metadata?.issueDate ?? document.issueDate)}T00:00:00Z`),
					issuer: document.issuer,
					lang: "es",
					order: document.order,
					skills: document.skills ?? metadata?.skills ?? [],
					title: document.title,
					translationKey: id,
					verificationUrl: document.verificationUrl ?? metadata?.verificationUrl,
				},
			},
		];
	});

export const badgeLoader = () =>
	sanityLoader("badge", (document) => [
		{
			id: String(document.id),
			data: {
				imageUrl: document.imageUrl,
				issueDate: new Date(`${String(document.issueDate)}T00:00:00Z`),
				issuer: document.issuer,
				title: document.title,
			},
		},
	]);
