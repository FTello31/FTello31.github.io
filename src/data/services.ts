import type { Locale } from "@/types";

export const services = {
	es: [
		{
			code: "WEB",
			description:
				"Landing pages, plataformas y aplicaciones web rápidas, accesibles y preparadas para crecer.",
			items: ["Producto y arquitectura", "Frontend y backend", "Rendimiento y SEO"],
			title: "Aplicaciones web",
		},
		{
			code: "APP",
			description:
				"Productos móviles nativos o multiplataforma centrados en una experiencia clara y fiable.",
			items: ["iOS y Android", "Integración con APIs", "Publicación y evolución"],
			title: "Aplicaciones móviles",
		},
		{
			code: "AUT",
			description:
				"Flujos que conectan herramientas, eliminan tareas repetitivas y reducen errores operativos.",
			items: ["Integraciones", "Procesos y datos", "Herramientas internas"],
			title: "Automatizaciones",
		},
		{
			code: "AI",
			description:
				"Funciones con IA aplicadas a problemas concretos, con seguridad, métricas y control humano.",
			items: ["Prototipos de IA", "Asistentes y búsqueda", "Cloud y observabilidad"],
			title: "IA aplicada",
		},
	],
	en: [
		{
			code: "WEB",
			description:
				"Landing pages, platforms and web applications that are fast, accessible and ready to grow.",
			items: ["Product and architecture", "Frontend and backend", "Performance and SEO"],
			title: "Web applications",
		},
		{
			code: "APP",
			description:
				"Native or cross-platform mobile products focused on a clear and reliable experience.",
			items: ["iOS and Android", "API integration", "Release and evolution"],
			title: "Mobile applications",
		},
		{
			code: "AUT",
			description:
				"Workflows that connect tools, remove repetitive tasks and reduce operational errors.",
			items: ["Integrations", "Processes and data", "Internal tools"],
			title: "Automation",
		},
		{
			code: "AI",
			description:
				"AI features applied to concrete problems with security, metrics and human control.",
			items: ["AI prototypes", "Assistants and search", "Cloud and observability"],
			title: "Applied AI",
		},
	],
} satisfies Record<Locale, { code: string; description: string; items: string[]; title: string }[]>;
