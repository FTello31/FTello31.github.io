import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
	loader: glob({ base: "./content/posts", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			...localized,
			coverImage: z.object({ alt: z.string(), src: image() }).optional(),
			description: z.string(),
			draft: z.boolean().default(false),
			externalUrl: z.url().optional(),
			ogImage: z.string().optional(),
			pinned: z.boolean().default(false),
			publishDate: toDate,
			tags: z.array(z.string()).default([]),
			title: z.string().max(120),
			updatedDate: toDate.optional(),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./content/notes", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		...localized,
		description: z.string().optional(),
		publishDate: toDate,
		title: z.string().max(120),
	}),
});

const project = defineCollection({
	loader: glob({ base: "./content/projects", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		...localized,
		description: z.string(),
		featured: z.boolean().default(false),
		imageUrl: z.url().optional(),
		order: z.number(),
		technologies: z.array(z.string()).default([]),
		title: z.string(),
		url: z.url(),
	}),
});

const experience = defineCollection({
	loader: glob({ base: "./content/experience", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		...localized,
		company: z.string(),
		companyUrl: z.url(),
		current: z.boolean().default(false),
		description: z.string(),
		endDate: z.string().optional(),
		order: z.number(),
		role: z.string(),
		startDate: z.string(),
		technologies: z.array(z.string()).default([]),
	}),
});

const certificate = defineCollection({
	loader: glob({ base: "./content/certificates", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		...localized,
		credentialUrl: z.url().optional(),
		featured: z.boolean().default(false),
		imageUrl: z.url().optional(),
		issueDate: toDate,
		issuer: z.string(),
		order: z.number(),
		title: z.string(),
	}),
});

export const collections = { certificate, experience, note, post, project };
