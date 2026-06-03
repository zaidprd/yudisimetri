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

const SmoothScrollHeroBackground: React.FC<Required<ISmoothScrollHeroProps>> = ({
	scrollHeight,
	desktopImage,
	mobileImage,
	initialClipPercentage,
	finalClipPercentage,
}) => {
	const { scrollY } = useScroll();

	const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
	const clipEnd = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
	const backgroundSize = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);

	return (
		<motion.div
			className="sticky top-0 h-screen w-full bg-black overflow-hidden"
			style={{ clipPath, willChange: "transform, clip-path" }}
		>
			<motion.div
				className="absolute inset-0 md:hidden"
				style={{
					backgroundImage: `url(${mobileImage})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>
			<motion.div
				className="absolute inset-0 hidden md:block"
				style={{
					backgroundImage: `url(${desktopImage})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>
		</motion.div>
	);
};

const SmoothScrollHero: React.FC<ISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=2500",
	mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=1000",
	initialClipPercentage = 25,
	finalClipPercentage = 75,
}) => {
	return (
		<div style={{ height: `calc(${scrollHeight}px + 100vh)` }} className="relative w-full bg-black">
			<SmoothScrollHeroBackground
				desktopImage={desktopImage}
				finalClipPercentage={finalClipPercentage}
				initialClipPercentage={initialClipPercentage}
				mobileImage={mobileImage}
				scrollHeight={scrollHeight}
			/>
		</div>
	);
};

export default SmoothScrollHero;
