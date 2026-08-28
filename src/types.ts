export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export interface SiteConfig {
	author: string;
	brand: string;
	contact: {
		email: string;
		responseTime: Record<Locale, string>;
	};
	date: { options: Intl.DateTimeFormatOptions };
	defaultLocale: Locale;
	description: string;
	founder: string;
	lang: string;
	locales: readonly Locale[];
	ogLocale: string;
	showLogo: boolean;
	socialLinks: { label: string; url: string }[];
	title: string;
	url: string;
	whatsapp: {
		messages: Record<Locale, string>;
		number: string;
	};
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	alternateUrl?: string | undefined;
	articleDate?: string | undefined;
	description?: string | undefined;
	locale?: Locale | undefined;
	ogImage?: string | undefined;
	languageUrl?: string | undefined;
	noindex?: boolean | undefined;
	shared?: boolean | undefined;
	title: string;
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";
