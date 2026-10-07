import type React from "react";
import { absoluteUrl, siteConfig } from "../config/site";
import { serializeJsonLd } from "./schema";

export interface SeoMetaOptions {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
	imageAlt?: string;
	type?: "website" | "article";
	noIndex?: boolean;
	jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export type SeoMetaTag = React.JSX.IntrinsicElements["meta"] | { title?: string };
export type SeoLinkTag = React.JSX.IntrinsicElements["link"];
export type SeoScriptTag = React.JSX.IntrinsicElements["script"];

export interface SeoHeadResult {
	meta: SeoMetaTag[];
	links: SeoLinkTag[];
	scripts: SeoScriptTag[];
}

/**
 * Creates the exact meta, links, and scripts arrays expected by TanStack Router's `head` option.
 */
export function createSeoMeta(options: SeoMetaOptions = {}): SeoHeadResult {
	const rawTitle = options.title?.trim();
	const title = rawTitle
		? rawTitle.includes("|")
			? rawTitle
			: `${rawTitle} | ${siteConfig.name}`
		: siteConfig.defaultTitle;

	const description = options.description?.trim() || siteConfig.defaultDescription;
	const canonicalUrl = absoluteUrl(options.path ?? "/");
	const imageUrl = absoluteUrl(options.image || siteConfig.defaultOgImage);
	const imageAlt = options.imageAlt || title;
	const type = options.type || "website";
	const robots = options.noIndex ? "noindex, nofollow" : "index, follow";

	const meta: SeoMetaTag[] = [
		{ title },
		{ name: "description", content: description },
		{ name: "robots", content: robots },
		{ name: "theme-color", content: siteConfig.themeColor },

		// Open Graph
		{ property: "og:site_name", content: siteConfig.name },
		{ property: "og:type", content: type },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: canonicalUrl },
		{ property: "og:image", content: imageUrl },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:image:alt", content: imageAlt },
		{ property: "og:locale", content: "en_NG" },

		// Twitter
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: imageUrl },
		{ name: "twitter:site", content: siteConfig.social.twitter },
		{ name: "twitter:creator", content: siteConfig.social.twitter },
	];

	const links: SeoLinkTag[] = [
		{ rel: "canonical", href: canonicalUrl },
	];

	const scripts: SeoScriptTag[] = [];

	if (options.jsonLd) {
		const schemas = Array.isArray(options.jsonLd)
			? options.jsonLd
			: [options.jsonLd];

		for (const schema of schemas) {
			scripts.push({
				type: "application/ld+json",
				children: serializeJsonLd(schema),
			});
		}
	}

	return {
		meta,
		links,
		scripts,
	};
}
