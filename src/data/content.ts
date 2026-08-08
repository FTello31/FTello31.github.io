import { getCollection } from "astro:content";
import type { Locale } from "@/types";

export async function getPosts(locale: Locale) {
	const posts = await getCollection(
		"post",
		({ data }) => data.lang === locale && (import.meta.env.PROD ? !data.draft : true),
	);
	return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getNotes() {
	const notes = await getCollection("note");
	return notes.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getCourses() {
	const courses = await getCollection("course");
	return courses.sort((a, b) => a.data.title.localeCompare(b.data.title, "en"));
}

export async function getCourseNotes(courseId: string) {
	const notes = await getCollection("note", ({ data }) => data.course?.id === courseId);
	return notes.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export async function getStandaloneNotes() {
	const notes = await getCollection("note", ({ data }) => !data.course);
	return notes.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getProjects(locale: Locale) {
	const projects = await getCollection("project", ({ data }) => data.lang === locale);
	return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getCaseStudies(locale: Locale) {
	const caseStudies = await getCollection(
		"caseStudy",
		({ data }) => data.lang === locale && !data.draft,
	);
	return caseStudies.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperience(locale: Locale) {
	const experience = await getCollection("experience", ({ data }) => data.lang === locale);
	return experience.sort((a, b) => a.data.order - b.data.order);
}

export async function getCertificates() {
	const certificates = await getCollection("certificate");
	return certificates.sort((a, b) => a.data.order - b.data.order);
}

export async function getBadges() {
	const badges = await getCollection("badge");
	return badges.sort((a, b) => b.data.issueDate.getTime() - a.data.issueDate.getTime());
}
