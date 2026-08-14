import { defineCollection, reference } from "astro:content";
import { NOTION_DATA_SOURCE_ID, NOTION_TOKEN } from "astro:env/server";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { notionNoteLoader } from "@/loaders/notion";
import {
	articleLoader,
	badgeLoader,
	certificateLoader,
	experienceLoader,
	projectLoader,
} from "@/loaders/sanity";

const locale = z.enum(["es", "en"]);
const localized = {
	lang: locale,
	translationKey: z.string(),
};
const toDate = z
	.string()
	.or(z.date())
	.transform((value) => new Date(value));

const post = defineCollection({
	loader: articleLoader(),
	schema: ({ image }) =>
		z.object({
			...localized,
			coverImage: z.object({ alt: z.string(), src: image() }).optional(),
			description: z.string(),
			draft: z.boolean().default(false),
			externalUrl: z.url(),
			imageUrl: z.url(),
			ogImage: z.string().optional(),
			pinned: z.boolean().default(false),
			publishDate: toDate,
			tags: z.array(z.string()),
			title: z.string().max(120),
			updatedDate: toDate.optional(),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./content/notes", pattern: "**/*.{md,mdx}" }),
	schema: z
		.object({
			course: reference("course").optional(),
			description: z.string().optional(),
			order: z.number().int().positive().optional(),
			publishDate: toDate,
			title: z.string().max(120),
		})
		.superRefine((entry, context) => {
			if (entry.course && !entry.order) {
				context.addIssue({
					code: "custom",
					message: "A course lesson requires a positive order.",
					path: ["order"],
				});
			}
		}),
});

const notionNote = defineCollection({
	loader: notionNoteLoader({
		dataSourceId: NOTION_DATA_SOURCE_ID,
		token: NOTION_TOKEN,
	}),
	schema: z.object({
		description: z.string().optional(),
		publishDate: z.date(),
		title: z.string().max(120),
	}),
});

const course = defineCollection({
	loader: glob({ base: "./content/courses", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		description: z.string(),
		title: z.string().max(120),
	}),
});

const project = defineCollection({
	loader: projectLoader(),
	schema: z.object({
		...localized,
		description: z.string(),
		featured: z.boolean(),
		imageUrl: z.url(),
		order: z.number(),
		technologies: z.array(z.string()),
		title: z.string(),
		url: z.url(),
	}),
});

const caseStudy = defineCollection({
	loader: glob({ base: "./content/case-studies", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z
			.object({
				...localized,
				cardTitle: z.string().max(120).optional(),
				clientName: z.string(),
				code: z.string(),
				coverFit: z.enum(["cover", "contain"]).default("cover"),
				coverImage: z.object({ alt: z.string(), src: image() }).optional(),
				cta: z.object({ body: z.string(), label: z.string(), title: z.string() }),
				description: z.string(),
				draft: z.boolean().default(false),
				duration: z.string().optional(),
				externalUrl: z.url().optional(),
				featured: z.boolean().default(false),
				gallery: z.array(z.object({ alt: z.string(), src: image() })).default([]),
				industry: z.string(),
				order: z.number(),
				results: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
				services: z.array(z.string()),
				testimonial: z
					.object({ author: z.string(), quote: z.string(), role: z.string() })
					.optional(),
				title: z.string().max(120),
				year: z.number().int().optional(),
			})
			.superRefine((entry, context) => {
				if (!entry.featured) return;
				if (entry.results.length === 0) {
					context.addIssue({
						code: "custom",
						message: "A featured case study requires at least one result.",
						path: ["results"],
					});
				}
			}),
});

const experience = defineCollection({
	loader: experienceLoader(),
	schema: z.object({
		...localized,
		company: z.string(),
		companyUrl: z.url(),
		current: z.boolean(),
		description: z.string(),
		endDate: z.string().optional(),
		order: z.number(),
		role: z.string(),
		startDate: z.string(),
		technologies: z.array(z.string()),
	}),
});

const certificate = defineCollection({
	loader: certificateLoader(),
	schema: z.object({
		...localized,
		credentialId: z.string().optional(),
		credentialType: z.enum(["certification", "course", "nanodegree", "learning-path"]),
		credentialUrl: z.url(),
		expirationDate: toDate.optional(),
		featured: z.boolean(),
		issueDate: toDate,
		issuer: z.string(),
		order: z.number(),
		skills: z.array(z.string()),
		title: z.string(),
		verificationUrl: z.url().optional(),
	}),
});

const badge = defineCollection({
	loader: badgeLoader(),
	schema: z.object({
		imageUrl: z.url(),
		issueDate: toDate,
		issuer: z.string(),
		title: z.string(),
	}),
});

export const collections = {
	badge,
	caseStudy,
	certificate,
	course,
	experience,
	note,
	notionNote,
	post,
	project,
};
