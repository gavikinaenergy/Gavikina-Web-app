const PHOTOS = [
	{
		src: "/installations/engineer-on-site.jpg",
		alt: "Gavikina Energy engineer in a hard hat and hi-vis vest on a customer site",
	},
	{
		src: "/installations/roof-array-1.jpg",
		alt: "Solar panels installed on a corrugated roof",
	},
	{
		src: "/installations/crew-arriving.jpg",
		alt: "Gavikina Energy crew in hi-vis vests arriving at a site",
	},
	{
		src: "/installations/inverter-battery.jpg",
		alt: "Wall-mounted inverter above a lithium battery",
	},
	{
		src: "/hero/gavikina-engineers-install.jpg",
		alt: "Two Gavikina Energy engineers installing an energy storage system",
	},
	{
		src: "/installations/roof-array-3.jpg",
		alt: "Row of solar panels on a brown metal roof",
	},
	{
		src: "/installations/commissioned-storage.jpg",
		alt: "Gavikina Energy engineer beside two commissioned energy storage units",
	},
	{
		src: "/installations/roof-array-2.jpg",
		alt: "Solar array on a pitched corrugated roof",
	},
	{
		src: "/installations/distribution-board.jpg",
		alt: "Gavikina Energy engineer working on a distribution board",
	},
];
const LOOP = [...PHOTOS, ...PHOTOS];

export default function InstallationsMarquee() {
	return (
		<div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
			<div className="animate-gv-marquee flex w-max hover:[animation-play-state:paused]">
				{LOOP.map((photo, i) => (
					<div
						key={`${photo.src}-${i}`}
						aria-hidden={i >= PHOTOS.length}
						className="mr-4 h-[320px] w-60 shrink-0 overflow-hidden rounded-2xl border border-navy/10 sm:h-96 sm:w-72"
					>
						<img
							src={photo.src}
							alt={i < PHOTOS.length ? photo.alt : ""}
							loading="lazy"
							className="h-full w-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
