import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ContactFormValues } from "@workspace/schemas";
import { contactFormSchema } from "@workspace/schemas";
import { Button } from "@workspace/ui/components/button";
import { FormInput, FormTextarea } from "@workspace/ui/components/form-fields";
import { toast } from "@workspace/ui/components/toast";
import { Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "#/modules/enquiries/api";
import { siteConfig } from "../config/site";
import { createContactPageSchema } from "../lib/schema";
import { createSeoMeta } from "../lib/seo";

export const Route = createFileRoute("/contact")({
	head: () =>
		createSeoMeta({
			title: `Contact Our Solar Team | ${siteConfig.name}`,
			description: `Contact ${siteConfig.name} by phone, WhatsApp, or email. Speak with our engineering team in ${siteConfig.contact.address.addressLocality}, ${siteConfig.contact.address.addressRegion}, to discuss your power requirements.`,
			path: "/contact",
			jsonLd: createContactPageSchema(),
		}),
	component: Contact,
});

const CONTACT_METHODS = [
	{
		icon: Phone,
		label: "Phone",
		value: siteConfig.contact.phone,
		href: siteConfig.contact.links.tel,
		note: siteConfig.contact.notes.phone,
	},
	{
		icon: MessageCircle,
		label: "WhatsApp",
		value: siteConfig.contact.whatsapp,
		href: siteConfig.contact.links.whatsapp,
		note: siteConfig.contact.notes.whatsapp,
	},
	{
		icon: Mail,
		label: "Email",
		value: siteConfig.contact.email,
		href: siteConfig.contact.links.email,
		note: siteConfig.contact.notes.email,
	},
	{
		icon: MapPin,
		label: "Office",
		value: siteConfig.contact.address.formattedShort,
		href: siteConfig.contact.links.maps,
		note: siteConfig.contact.notes.office,
	},
];

function Contact() {
	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: { name: "", contact: "", message: "" },
	});
	const [sent, setSent] = useState(false);
	const mutation = useMutation({
		mutationFn: submitContact,
		onSuccess(data) {
			if (data.success) {
				setSent(true);
			}
		},
		onError(error) {
			toast.add({
				title: "Error",
				description:
					error?.message || "Failed to send message. Please try again later.",
				type: "error",
			});
			console.error("Error submitting contact form:", error);
		},
	});

	const onSubmit = form.handleSubmit(async (values) => {
		mutation.mutate({ data: values });
	});

	return (
		<div className="section-wrapper">
			<span className="text-xs font-semibold uppercase tracking-widest text-green">
				Contact
			</span>
			<h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl">
				Talk to our team.
			</h1>

			<div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
				{/* Left Column: Contact Methods & Map */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						{CONTACT_METHODS.map((c) => {
							const Icon = c.icon;
							return (
								<div
									key={c.label}
									className="flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-xs"
								>
									<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green">
										<Icon className="size-4" />
									</span>
									<div>
										<span className="text-xs font-semibold uppercase tracking-wider text-navy/50">
											{c.label}
										</span>
										<a
											href={c.href}
											target={c.href.startsWith("http") ? "_blank" : undefined}
											rel={
												c.href.startsWith("http")
													? "noopener noreferrer"
													: undefined
											}
											className="mt-1 block text-base font-semibold tracking-tight text-navy transition-colors hover:text-green"
										>
											{c.value}
										</a>
										<div className="mt-0.5 text-xs text-navy/60 sm:text-sm">
											{c.note}
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="overflow-hidden rounded-2xl border border-navy/10 bg-cream">
						<iframe
							title={`Map of ${siteConfig.contact.address.streetAddress}, ${siteConfig.contact.address.addressLocality}, ${siteConfig.contact.address.addressRegion}`}
							src={siteConfig.contact.address.mapEmbedUrl}
							loading="lazy"
							className="block h-64 w-full border-0"
						/>
						<div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5">
							<div>
								<div className="text-sm font-semibold tracking-tight text-navy">
									{siteConfig.contact.address.streetAddress}
								</div>
								<div className="mt-0.5 text-xs text-navy/60">
									{siteConfig.contact.address.addressLocality}, {siteConfig.contact.address.addressRegion} {siteConfig.contact.address.postalCode}
								</div>
							</div>
							<Button
								variant="outline"
								size="sm"
								nativeButton={false}
								render={
									<a
										href={siteConfig.contact.address.mapUrl}
										target="_blank"
										rel="noopener noreferrer"
									/>
								}
							>
								Get directions
							</Button>
						</div>
					</div>
				</div>

				{/* Right Column: Contact Form */}
				<div className="rounded-2xl bg-cream p-6 sm:p-8">
					{!sent ? (
						<form
							onSubmit={onSubmit}
							noValidate
							className="flex flex-col gap-6"
						>
							<div>
								<h3 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
									Send us a message
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-navy/70">
									Goes straight to our team inbox. For a sized recommendation,
									the assessment is faster.
								</p>
							</div>

							<div className="flex flex-col gap-4">
								<FormInput
									control={form.control}
									name="name"
									label="Name"
									placeholder="Full name"
									className="border border-navy/18 shadow-none bg-white text-navy placeholder:text-navy/40"
								/>

								<FormInput
									control={form.control}
									name="contact"
									label="Email or phone"
									placeholder="How we reach you"
									className="border border-navy/18 shadow-none bg-white text-navy placeholder:text-navy/40"
								/>

								<FormTextarea
									control={form.control}
									name="message"
									label="Message"
									rows={5}
									placeholder="What do you need?"
									className="border border-navy/18 shadow-none bg-white text-navy placeholder:text-navy/40 min-h-37"
								/>

								<Button
									variant={"primary"}
									type="submit"
									size="lg"
									className="mt-2 w-full"
									disabled={mutation.isPending}
								>
									{mutation.isPending ? "Sending..." : "Send message"}
								</Button>
							</div>
						</form>
					) : (
						<div className="animate-gv-in py-8 text-center sm:py-12">
							<span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-green text-white shadow-md">
								<Check className="size-6" />
							</span>
							<h3 className="mt-5 text-2xl font-semibold tracking-tight text-navy">
								Message sent
							</h3>
							<p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-navy/70">
								It is in our inbox and we reply the same working day. If it is
								urgent, WhatsApp is fastest.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
