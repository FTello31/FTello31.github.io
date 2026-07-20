import { siteConfig } from "@/site.config";
import type { Locale } from "@/types";

export const ui = {
	es: {
		availability: "Disponible para nuevos proyectos",
		blog: "Blog",
		certificates: "Certificados",
		content: "Contenido",
		copyright: "Estudio independiente de software",
		cv: "CV — English",
		discussProject: "Cuéntame tu proyecto",
		experience: "Experiencia",
		home: "Inicio",
		language: "English",
		menu: "Abrir menú",
		notes: "Notas",
		projects: "Proyectos",
		readMore: "Ver todos",
		services: "Servicios",
		skip: "Saltar al contenido",
		studio: "Estudio",
		theme: "Cambiar tema",
		whatsapp: "Hablar por WhatsApp",
		about: "Sobre mí",
	},
	en: {
		availability: "Available for new projects",
		blog: "Blog",
		certificates: "Certificates",
		content: "Content",
		copyright: "Independent software studio",
		cv: "Resume — English",
		discussProject: "Tell me about your project",
		experience: "Experience",
		home: "Home",
		language: "Español",
		menu: "Open menu",
		notes: "Notes",
		projects: "Projects",
		readMore: "View all",
		services: "Services",
		skip: "Skip to content",
		studio: "Studio",
		theme: "Change theme",
		whatsapp: "Chat on WhatsApp",
		about: "About",
	},
} as const;

export const paths = {
	es: {
		about: "/sobre-mi/",
		blog: "/blog/",
		certificates: "/certificados/",
		home: "/",
		notes: "/notas/",
		projects: "/proyectos/",
		services: "/servicios/",
	},
	en: {
		about: "/en/about/",
		blog: "/en/blog/",
		certificates: "/en/certificates/",
		home: "/en/",
		notes: "/en/notes/",
		projects: "/en/projects/",
		services: "/en/services/",
	},
} as const;

export function entrySlug(id: string): string {
	return id.split("/").slice(1).join("/");
}

export function whatsappUrl(locale: Locale): string {
	return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.messages[locale])}`;
}
