import { siteConfig } from "../config/site";

export function buildWhatsAppUrl(message: string) {
	return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
