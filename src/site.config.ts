import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	author: "Fernando Tello",
	brand: "Fernando Tello Studio",
	contact: {
		email: "feranto31@hotmail.com",
		responseTime: {
			en: "1–2 business days",
			es: "1–2 días laborables",
		},
	},
	date: {
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	defaultLocale: "es",
	description:
		"Automatizaciones, herramientas internas y aplicaciones web para pymes que necesitan operar mejor.",
	founder: "Fernando Tello",
	lang: "es",
	locales: ["es", "en"],
	ogLocale: "es_ES",
	showLogo: true,
	socialLinks: [
		{ label: "GitHub", url: "https://github.com/FTello31" },
		{ label: "LinkedIn", url: "https://linkedin.com/in/fernandotello" },
	],
	title: "Fernando Tello Studio",
	url: "https://fernandotello.netlify.app/",
	whatsapp: {
		messages: {
			en: "Hi Fernando, I found your Studio and I'd like to discuss a project.",
			es: "Hola Fernando, he visto tu estudio y me gustaría hablar sobre un proyecto.",
		},
		number: "34672322778",
	},
};

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "0",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: { frameBoxShadowCssValue: "none" },
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find(
				(variant) => variant.theme.type !== baseTheme?.type,
			)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
