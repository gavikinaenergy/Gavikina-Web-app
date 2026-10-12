export const siteConfig = {
	name: "Gavikina Energy",
	legalName: "Gavikina Nigeria Limited",
	shortName: "Gavikina",
	url: "https://gavikinaenergy.com",
	defaultTitle: "Solar Systems and Battery Installations | Gavikina Energy",
	defaultDescription:
		"Solar power systems sized from measured load audits for homes and businesses in Nigeria. Installed with lithium batteries and owned outright.",
	themeColor: "#101328",
	defaultOgImage: "/og-image.webp",
	social: {
		twitter: "@gavikinaenergy",
		twitterUrl: "https://twitter.com/gavikinaenergy",
		linkedinUrl: "https://www.linkedin.com/company/gavikina-energy",
	},
	contact: {
		phone: "+234 913 222 2384",
		phoneIntl: "+2349132222384",
		whatsapp: "+234 913 222 2384",
		email: "hello@gavikinaenergy.com",
		address: {
			streetAddress: "121 Lawanson Rd, beside Adidde Supermarket",
			addressLocality: "Surulere",
			addressRegion: "Lagos",
			postalCode: "100254",
			addressCountry: "NG",
		},
	},
} as const;

export function absoluteUrl(path = ""): string {
	const base = siteConfig.url.replace(/\/+$/, "");
	if (!path || path === "/") return base;
	if (/^https?:\/\//i.test(path)) return path;
	const cleanPath = path.replace(/^\/+/, "").replace(/\/+$/, "");
	return `${base}/${cleanPath}`;
}
