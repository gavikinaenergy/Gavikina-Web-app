import type { Tier } from "@workspace/engine";
import { absoluteUrl, siteConfig } from "../config/site";

export function serializeJsonLd(schema: unknown): string {
	return JSON.stringify(schema, null, 0).replace(/</g, "\\u003c");
}

/**
 * Root schema: WebSite and Organization (placed in __root.tsx).
 */
export function createRootSchema() {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${siteConfig.url}/#website`,
				url: siteConfig.url,
				name: siteConfig.name,
				description: siteConfig.defaultDescription,
				publisher: {
					"@id": `${siteConfig.url}/#organization`,
				},
				inLanguage: "en-NG",
			},
			{
				"@type": "Organization",
				"@id": `${siteConfig.url}/#organization`,
				name: siteConfig.name,
				legalName: siteConfig.legalName,
				url: siteConfig.url,
				logo: {
					"@type": "ImageObject",
					url: absoluteUrl(siteConfig.defaultOgImage),
					caption: siteConfig.name,
				},
				address: {
					"@type": "PostalAddress",
					streetAddress: siteConfig.contact.address.streetAddress,
					addressLocality: siteConfig.contact.address.addressLocality,
					addressRegion: siteConfig.contact.address.addressRegion,
					addressCountry: siteConfig.contact.address.addressCountry,
				},
				contactPoint: {
					"@type": "ContactPoint",
					telephone: siteConfig.contact.phoneIntl,
					contactType: "customer service",
					areaServed: "NG",
					availableLanguage: ["en"],
				},
				sameAs: [
					siteConfig.social.twitterUrl,
					siteConfig.social.linkedinUrl,
				],
			},
		],
	};
}

/**
 * SoftwareApplication schema for interactive web tools (Calculator, Assessment wizard).
 */
export function createSoftwareApplicationSchema({
	name,
	description,
	path,
	applicationCategory = "UtilitiesApplication",
}: {
	name: string;
	description: string;
	path: string;
	applicationCategory?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name,
		description,
		url: absoluteUrl(path),
		applicationCategory,
		operatingSystem: "Web Browser",
		browserRequirements: "Requires modern web browser with JavaScript enabled",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "NGN",
		},
		provider: {
			"@id": `${siteConfig.url}/#organization`,
		},
	};
}

/**
 * Product Catalogue schema for solar system tiers.
 * Dynamically maps live Tier data from the backend when provided, with standard fallbacks.
 */
export function createProductCatalogueSchema(
	tiersData?: Tier[] | { data: Tier[] } | null,
) {
	const liveTiers = Array.isArray(tiersData)
		? tiersData
		: tiersData && "data" in tiersData && Array.isArray(tiersData.data)
			? tiersData.data
			: null;

	const defaultTiers = [
		{
			name: "1.5kVA Solar System",
			description:
				"Entry setup for basic lighting, fans, entertainment, and device charging with lithium battery storage.",
			price_range_min: 2000000,
			price_range_max: 3000000,
		},
		{
			name: "2.5kVA Solar System",
			description:
				"Standard residential setup covering home electronics, lighting, refrigeration, and workstation loads.",
			price_range_min: 3500000,
			price_range_max: 5000000,
		},
		{
			name: "3.5kVA Solar System",
			description:
				"Family residence system capable of supporting refrigeration, pumping, and energy-efficient cooling.",
			price_range_min: 5000000,
			price_range_max: 7000000,
		},
		{
			name: "5.0kVA Solar System",
			description:
				"Heavy residential and office system supporting inverter air conditioners, water pumps, and sustained daytime loads.",
			price_range_min: 7500000,
			price_range_max: 10500000,
		},
		{
			name: "10kVA Solar System",
			description:
				"High-capacity commercial and multi-room setup engineered for multi-unit facilities and continuous operational uptime.",
			price_range_min: 14000000,
			price_range_max: 20000000,
		},
	];

	const tiers =
		liveTiers && liveTiers.length > 0
			? liveTiers.map((t) => ({
					name: t.name.toLowerCase().includes("solar")
						? t.name
						: `${t.name} Solar System`,
					description:
						t.notes ||
						(t.typically_powers && t.typically_powers.length > 0
							? `Typically powers: ${t.typically_powers.join(", ")}.`
							: `Complete ${t.size_kva ? `${t.size_kva}kVA` : t.name} solar system with hybrid inverter and lithium battery storage.`),
					price_range_min: t.price_range_min,
					price_range_max: t.price_range_max,
				}))
			: defaultTiers;

	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Complete Solar System Tiers | Gavikina Energy",
		description:
			"Standardised solar system tiers from 1.5kVA to 10kVA with hybrid inverters, monocrystalline panels, and lithium battery storage.",
		url: absoluteUrl("/catalogue"),
		mainEntity: {
			"@type": "OfferCatalog",
			name: "Solar System Capacities",
			itemListElement: tiers.map((tier, idx) => ({
				"@type": "Offer",
				position: idx + 1,
				itemOffered: {
					"@type": "Product",
					name: tier.name,
					description: tier.description,
					brand: {
						"@type": "Brand",
						name: siteConfig.name,
					},
				},
				priceCurrency: "NGN",
				price: tier.price_range_min,
				priceSpecification: {
					"@type": "PriceSpecification",
					priceCurrency: "NGN",
					minPrice: tier.price_range_min,
					maxPrice: tier.price_range_max,
				},
			})),
		},
	};
}

/**
 * Projects / Case Studies collection schema.
 */
export function createProjectsCollectionSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Solar Installation Projects | Gavikina Energy",
		description:
			"Gallery of completed solar installations across Nigeria with verified capacities and engineering specifications.",
		url: absoluteUrl("/projects"),
		provider: {
			"@id": `${siteConfig.url}/#organization`,
		},
	};
}

/**
 * FAQPage schema for frequently asked questions.
 */
export function createFaqSchema(
	faqs: Array<{ q: string; a: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a,
			},
		})),
	};
}

/**
 * AboutPage schema.
 */
export function createAboutPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		name: "About Our Solar Company | Gavikina Energy",
		description:
			"Gavikina Nigeria Limited engineers complete solar and lithium battery installations. We size systems accurately so clients own their energy assets.",
		url: absoluteUrl("/about"),
		mainEntity: {
			"@id": `${siteConfig.url}/#organization`,
		},
	};
}

/**
 * ContactPage schema.
 */
export function createContactPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contact Our Solar Team | Gavikina Energy",
		description:
			"Contact Gavikina Energy by phone, WhatsApp, or email. Speak with our engineering team in Victoria Island, Lagos, to discuss your power requirements.",
		url: absoluteUrl("/contact"),
		mainEntity: {
			"@id": `${siteConfig.url}/#organization`,
		},
	};
}

/**
 * Standard WebPage schema for informational routes.
 */
export function createWebPageSchema({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: title,
		description,
		url: absoluteUrl(path),
		isPartOf: {
			"@id": `${siteConfig.url}/#website`,
		},
	};
}
