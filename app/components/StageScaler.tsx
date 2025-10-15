"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

type StageScalerProps = {
	baseWidth: number;
	baseHeight: number;
	align?: "center" | "top-left" | "top" | "left";
	offsetX?: number;
	offsetY?: number;
	children: React.ReactNode;
};

export default function StageScaler({ baseWidth, baseHeight, align = "center", offsetX = 0, offsetY = 0, children }: StageScalerProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState(1);
	const [mounted, setMounted] = useState(false);

	useLayoutEffect(() => {
		function handleResize() {
			const w = window.innerWidth;
			const h = window.innerHeight;
			const scaleW = w / baseWidth;
			const scaleH = h / baseHeight;
			setScale(Math.min(scaleW, scaleH));
		}
		handleResize();
		setMounted(true);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [baseWidth, baseHeight]);

	const justify = useMemo(() => {
		if (align === "top-left") return "items-start justify-start";
		if (align === "top") return "items-start justify-center";
		if (align === "left") return "items-center justify-start";
		return "items-center justify-center";
	}, [align]);

    return (
        <div ref={containerRef} className={`w-screen h-screen overflow-hidden flex ${justify} bg-black/0`} style={{ paddingLeft: offsetX, paddingTop: offsetY, opacity: mounted ? 1 : 0, boxSizing: "border-box" }}>
            <div
				className="relative will-change-transform"
				style={{ width: baseWidth, height: baseHeight, transform: `translateZ(0px) scale(${Math.round(scale * 100) / 100})`, transformOrigin: "left top" }}
            >
				{children}
			</div>
		</div>
	);
}
