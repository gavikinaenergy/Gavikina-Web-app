import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import facebookIcon from "../assets/facebook.svg";
import instagramIcon from "../assets/instagram.svg";
import linkedinIcon from "../assets/linkedin.svg";
import logo from "../assets/logo-primary-ondark.svg";
import xIcon from "../assets/twitter-x.svg";
import { FOOTER_COLS } from "../lib/content";
import { openAssess } from "../store/modal";
import { siteConfig } from "#/config/site";

const SOCIAL_LINKS = [
	{
		label: "X",
		href: siteConfig.social.twitterUrl,
		icon: xIcon,
	},
	{
		label: "Instagram",
		href: siteConfig.social.instagramUrl,
		icon: instagramIcon,
	},
	{
		label: "Facebook",
		href: siteConfig.social.facebookUrl,
		icon: facebookIcon,
	},
	{
		label: "LinkedIn",
		href: siteConfig.social.linkedinUrl,
		icon: linkedinIcon,
	},
];

export default function Footer() {
	return (
		<footer className="bg-ink text-white">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12">
					{/* Brand Column */}
					<div>
						<img
							src={logo}
							alt="Gavikina Energy"
							className="block h-9 w-auto"
						/>
						<p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
							Reliable solar and energy solutions for homes, businesses and
							multi-site operations across Nigeria.
						</p>
						<Button className="mt-6" size="sm" onClick={() => openAssess()}>
							Free Online Energy Assessment
						</Button>
						<Link
							to="/agent"
							className="mt-4 block text-sm font-semibold text-white transition-colors hover:text-white/80"
						>
							Become an agent →
						</Link>

						<div className="mt-6 flex items-center gap-2.5">
							{SOCIAL_LINKS.map((item) => (
								<a
									key={item.label}
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Follow Gavikina Energy on ${item.label}`}
									title={item.label}
									className="group flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
								>
									<img
										src={item.icon}
										alt=""
										aria-hidden="true"
										className="size-4 object-contain brightness-0 invert opacity-75 transition-opacity group-hover:opacity-100"
									/>
								</a>
							))}
						</div>
					</div>

					{/* Navigation Columns */}
					{FOOTER_COLS.map((col) => (
						<div key={col.label}>
							<span className="text-xs font-semibold uppercase tracking-wider text-white/40">
								{col.label}
							</span>
							<div className="mt-4 flex flex-col items-start gap-3">
								{col.items.map(([path, label]) => (
									<Link
										key={path}
										to={path}
										className="text-sm text-white/70 transition-colors hover:text-white"
									>
										{label}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-col gap-1">
							<span className="text-xs text-white/50">
								© 2026 Gavikina Energy. Power Your Own.
							</span>
							<span className="text-[11px] text-white/35">
								Gavikina Energy is a brand of Gavikina Nigeria Limited.
							</span>
						</div>
						<div className="flex items-center gap-4">
							<Link
								to="/privacy"
								className="text-xs text-white/50 transition-colors hover:text-white"
							>
								Privacy Policy
							</Link>
							<Link
								to="/terms"
								className="text-xs text-white/50 transition-colors hover:text-white"
							>
								Terms &amp; Conditions
							</Link>
						</div>
					</div>
					<span className="text-xs text-white/50">
						Prices on this site are indicative ranges, confirmed after site
						inspection.
					</span>
				</div>
			</div>
		</footer>
	);
}
