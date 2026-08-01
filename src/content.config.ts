import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
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
	schema: z.object({
		...localized,
		description: z.string().optional(),
		publishDate: toDate,
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

export const collections = { badge, certificate, experience, note, post, project };
