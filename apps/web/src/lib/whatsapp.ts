const WHATSAPP_NUMBER = "2349132222384";

export function buildWhatsAppUrl(message: string) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
