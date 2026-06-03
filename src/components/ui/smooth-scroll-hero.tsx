"use client";
import * as React from "react";

interface ISmoothScrollHeroProps {
	scrollHeight?: number;
	desktopImage?: string;
	mobileImage?: string;
	initialClipPercentage?: number;
	finalClipPercentage?: number;
}

const SmoothScrollHero: React.FC<ISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage = "/img/Panel-matrix-simetri.webp",
	mobileImage  = "/img/Panel-matrix-simetri.webp",
	initialClipPercentage = 25,
	finalClipPercentage   = 75,
}) => {
	const stickyRef = React.useRef<HTMLDivElement>(null);

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

	React.useEffect(() => {
		if (!isDesktop || !stickyRef.current) return;

		const el = stickyRef.current;
		let rafId: number;

		const update = () => {
			const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
			const start   = initialClipPercentage * (1 - progress);
			const end     = finalClipPercentage + (100 - finalClipPercentage) * progress;
			const bgSize  = 170 - 70 * progress;
			el.style.clipPath      = `polygon(${start}% ${start}%, ${end}% ${start}%, ${end}% ${end}%, ${start}% ${end}%)`;
			el.style.backgroundSize = `${bgSize}%`;
		};

		const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update); };

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
	}, [isDesktop, scrollHeight, initialClipPercentage, finalClipPercentage]);

	if (!isDesktop) {
		return (
			<div className="relative w-full" style={{ height: "100vh" }}>
				<div
					className="sticky top-0 h-screen w-full overflow-hidden"
					style={{
						backgroundImage: `url(${mobileImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			</div>
		);
	}

	return (
		<div className="relative w-full bg-black" style={{ height: `calc(${scrollHeight}px + 100vh)` }}>
			<div
				ref={stickyRef}
				className="sticky top-0 h-screen w-full overflow-hidden"
				style={{
					backgroundImage: `url(${desktopImage})`,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					willChange: "clip-path",
				}}
			/>
		</div>
	);
};

export default SmoothScrollHero;
