const PARTNERS = [
	{ name: "itel Energy", src: "/partners/itel-energy.jpg" },
	{ name: "Haisic", src: "/partners/haisic.jpg" },
	{ name: "Growatt", src: "/partners/growatt.jpg" },
	{ name: "SRNE", src: "/partners/srne.jpg" },
	{ name: "Fintrotech", src: "/partners/fintrotech.jpg" },
];

// Repeated so one half of the track is wider than any viewport; the track
// then holds two identical halves so the -50% marquee loops seamlessly.
const HALF = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function PartnersSlider() {
	return (
		<div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
			<div className="animate-gv-marquee flex w-max hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
				{[0, 1].map((half) => (
					<ul
						key={half}
						aria-hidden={half === 1}
						className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
					>
						{HALF.map((partner, i) => (
							<li
								key={`${partner.name}-${i}`}
								className="flex h-24 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-navy/10 bg-white sm:h-28 sm:w-52"
							>
								<img
									src={partner.src}
									alt={i < PARTNERS.length ? partner.name : ""}
									loading="lazy"
									className="h-full w-full object-contain"
								/>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
}
