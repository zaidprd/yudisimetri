"use client";
import * as React from "react";
import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface ISmoothScrollHeroProps {
	scrollHeight?: number;
	desktopImage?: string;
	mobileImage?: string;
	initialClipPercentage?: number;
	finalClipPercentage?: number;
}

// ─── Desktop only: animated clip-path reveal ────────────────────────────────
const DesktopBackground: React.FC<{
	scrollHeight: number;
	image: string;
	initialClipPercentage: number;
	finalClipPercentage: number;
}> = ({ scrollHeight, image, initialClipPercentage, finalClipPercentage }) => {
	const { scrollY } = useScroll();

	const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
	const clipEnd   = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
	const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
	const backgroundSize = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);

	return (
		<motion.div
			className="sticky top-0 h-screen w-full bg-black overflow-hidden"
			style={{ clipPath, willChange: "transform, clip-path" }}
		>
			<motion.div
				className="absolute inset-0"
				style={{
					backgroundImage: `url(${image})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>
		</motion.div>
	);
};

// ─── Mobile / tablet: full-bleed static cover, no clip-path ─────────────────
const MobileBackground: React.FC<{ image: string }> = ({ image }) => (
	<div
		className="sticky top-0 h-screen w-full overflow-hidden"
		style={{
			backgroundImage: `url(${image})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
		}}
	/>
);

// ─── Root component ──────────────────────────────────────────────────────────
const SmoothScrollHero: React.FC<ISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=2500",
	mobileImage  = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=1000",
	initialClipPercentage = 25,
	finalClipPercentage   = 75,
}) => {
	// Initialise from window immediately (client) or assume desktop (SSR).
	// This avoids a layout flash on desktop; mobile sees a single brief repaint.
	const [isDesktop, setIsDesktop] = React.useState<boolean>(() =>
		typeof window !== "undefined"
			? window.matchMedia("(min-width: 1024px)").matches
			: true
	);

	React.useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		setIsDesktop(mq.matches);
		const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	// Mobile: plain 100vh wrapper — no extra scroll space needed.
	if (!isDesktop) {
		return (
			<div className="relative w-full" style={{ height: "100vh" }}>
				<MobileBackground image={mobileImage} />
			</div>
		);
	}

	// Desktop: tall wrapper drives the scroll-linked clip animation.
	return (
		<div
			className="relative w-full bg-black"
			style={{ height: `calc(${scrollHeight}px + 100vh)` }}
		>
			<DesktopBackground
				scrollHeight={scrollHeight}
				image={desktopImage}
				initialClipPercentage={initialClipPercentage}
				finalClipPercentage={finalClipPercentage}
			/>
		</div>
	);
};

export default SmoothScrollHero;
