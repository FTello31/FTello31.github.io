import { siteConfig } from "@/site.config";
import type { Locale } from "@/types";

export const ui = {
	es: {
		availability: "Madrid / remoto",
		blog: "Blog",
		cases: "Casos",
		certificates: "Certificados",
		contact: "Contacto",
		content: "Contenido",
		copyright: "Estudio independiente de software",
		cv: "CV — English",
		discussProject: "Cuéntame tu proyecto",
		experience: "Experiencia",
		home: "Inicio",
		language: "English",
		menu: "Abrir menú",
		notes: "Notas",
		ideas: "Ideas",
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
		availability: "Madrid / remote",
		blog: "Blog",
		cases: "Case studies",
		certificates: "Certificates",
		contact: "Contact",
		content: "Content",
		copyright: "Independent software studio",
		cv: "Resume — English",
		discussProject: "Tell me about your project",
		experience: "Experience",
		home: "Home",
		language: "Español",
		menu: "Open menu",
		notes: "Notes",
		ideas: "Ideas",
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
		cases: "/casos/",
		certificates: "/certificados/",
		contact: "/contacto/",
		home: "/",
		ideas: "/ideas/",
		notes: "/notas/",
		privacy: "/privacidad/",
		projects: "/proyectos/",
		services: "/servicios/",
		thanks: "/contacto/gracias/",
	},
	en: {
		about: "/en/about/",
		blog: "/en/blog/",
		cases: "/en/cases/",
		certificates: "/en/certificates/",
		contact: "/en/contact/",
		home: "/en/",
		ideas: "/en/ideas/",
		notes: "/en/notes/",
		privacy: "/en/privacy/",
		projects: "/en/projects/",
		services: "/en/services/",
		thanks: "/en/contact/thanks/",
	},
} as const;

export function caseStudyPath(locale: Locale, id: string): string {
	return `${paths[locale].cases}${entrySlug(id)}/`;
}

export function entrySlug(id: string): string {
	return id.split("/").slice(1).join("/");
}

export function whatsappUrl(locale: Locale): string {
	return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.messages[locale])}`;
}
