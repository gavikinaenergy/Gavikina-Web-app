import whatsappIcon from "../assets/whatsapp.svg";
import { buildWhatsAppUrl } from "#/lib/whatsapp";

export default function WhatsAppButton() {
	const whatsappUrl = buildWhatsAppUrl(
		"Hello Gavikina Energy, I would like to make an enquiry about your solar and energy solutions.",
	);

	return (
		<a
			id="floating-whatsapp-btn"
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chat with Gavikina Energy on WhatsApp"
			title="Chat with Gavikina Energy on WhatsApp"
			className="group fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center overflow-hidden rounded-full bg-green text-white shadow-lg shadow-green/25 transition-all duration-300 ease-out hover:w-42 hover:bg-green hover:shadow-xl hover:shadow-green/35 hover:-translate-y-0.5 focus-visible:w-42 focus-visible:bg-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
		>
			<div className="flex size-13 shrink-0 items-center justify-center">
				<img
					src={whatsappIcon}
					alt="WhatsApp"
					className="size-7.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
				/>
			</div>
			<span className="whitespace-nowrap pr-4 text-sm font-semibold tracking-wide opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
				Chat with us
			</span>
		</a>
	);
}
