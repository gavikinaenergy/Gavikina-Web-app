export const siteConfig = {
	name: "Gavikina Energy",
	legalName: "Gavikina Nigeria Limited",
	shortName: "Gavikina",
	tagline: "Power Your Own.",
	url: "https://gavikinaenergy.com",
	domain: "gavikinaenergy.com",
	defaultTitle: "Solar Systems and Battery Installations | Gavikina Energy",
	defaultDescription:
		"Solar power systems sized from measured load audits for homes and businesses in Nigeria. Installed with lithium batteries and owned outright.",
	themeColor: "#101328",
	defaultOgImage: "/og-image.webp",
	pricingDisclaimer:
		"Prices on this site are indicative ranges, confirmed after site inspection.",
	social: {
		twitter: "@GavikinaEnergy",
		twitterUrl: "https://x.com/GavikinaEnergy",
		instagramUrl: "https://www.instagram.com/gavikina?obrf=MW15NTN5bmk0dzh4Zw==",
		facebookUrl: "https://www.facebook.com/share/1FUANG8Qbe/",
		linkedinUrl:
			"https://www.linkedin.com/in/gavikina-energy-436608444?utm_source=share_via&utm_content=profile&utm_medium=member_android",
	},
	contact: {
		phone: "+234 913 222 2384",
		phoneIntl: "+2349132222384",
		whatsapp: "+234 913 222 2384",
		whatsappNumber: "2349132222384",
		defaultWhatsAppMessage:
			"Hello Gavikina Energy, I would like to make an enquiry about your solar and energy solutions.",
		email: "info@gavikinaenergy.com",
		hours: "Mon–Sat, 8am to 6pm",
		notes: {
			phone: "Mon–Sat, 8am to 6pm",
			whatsapp: "Fastest for photos of your board or roof",
			email: "Replied the same working day",
			office: "Visits by appointment",
		},
		address: {
			streetAddress: "121 Lawanson Rd",
			addressLocality: "Surulere",
			addressRegion: "Lagos",
			postalCode: "100254",
			addressCountry: "NG",
			countryName: "Nigeria",
			formatted:
				"121 Lawanson Rd, Surulere, Lagos 100254, Nigeria",
			formattedShort: "121 Lawanson Rd, Surulere, Lagos 100254",
			mapQuery: "121 Lawanson Rd, Surulere, Lagos 100254",
			mapUrl:
				"https://www.google.com/maps/search/?api=1&query=121+Lawanson+Rd%2C+Surulere%2C+Lagos+100254",
			mapEmbedUrl:
				"https://www.openstreetmap.org/export/embed.html?bbox=3.3378%2C6.5068%2C3.3528%2C6.5168&layer=mapnik&marker=6.5118%2C3.3453",
		},
		links: {
			tel: "tel:+2349132222384",
			email: "mailto:info@gavikinaenergy.com",
			whatsapp: "https://wa.me/2349132222384",
			maps: "https://www.google.com/maps/search/?api=1&query=121+Lawanson+Rd%2C+Surulere%2C+Lagos+100254",
		},
	},
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = ""): string {
	const base = siteConfig.url.replace(/\/+$/, "");
	if (!path || path === "/") return base;
	if (/^https?:\/\//i.test(path)) return path;
	const cleanPath = path.replace(/^\/+/, "").replace(/\/+$/, "");
	return `${base}/${cleanPath}`;
}
