import { getCollection } from "astro:content";
import type { Locale } from "@/types";

export async function getPosts(locale: Locale) {
	const posts = await getCollection(
		"post",
		({ data }) => data.lang === locale && (import.meta.env.PROD ? !data.draft : true),
	);
	return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getNotes(locale: Locale) {
	const notes = await getCollection("note", ({ data }) => data.lang === locale);
	return notes.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getProjects(locale: Locale) {
	const projects = await getCollection("project", ({ data }) => data.lang === locale);
	return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperience(locale: Locale) {
	const experience = await getCollection("experience", ({ data }) => data.lang === locale);
	return experience.sort((a, b) => a.data.order - b.data.order);
}

export async function getCertificates() {
	const certificates = await getCollection("certificate");
	return certificates.sort((a, b) => a.data.order - b.data.order);
}
