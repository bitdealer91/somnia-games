"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Card3D from "./Card3D";
import type { Card3DProps } from "./Card3D";

export type CardItem = {
	id: string;
	title?: string;
	description?: string;
	frontImageSrc?: string;
	backImageSrc?: string;
	x: number;
	y: number;
};

const BASE_WIDTH = 184;
const BASE_HEIGHT = 260;
const STAGE_WIDTH = 1716;
const STAGE_HEIGHT = 1023;

export default function CardsScene({ items }: { items: CardItem[] }) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [flippedIds, setFlippedIds] = useState<Set<string>>(() => new Set());
	const [tiltById, setTiltById] = useState<Record<string, { rx: number; ry: number }>>({});
	const phasesRef = useRef<Record<string, { p1: number; p2: number }>>({});

	// seed phases per card for varied motion
	useEffect(() => {
		const map: Record<string, { p1: number; p2: number }> = { ...phasesRef.current };
		items.forEach((it, idx) => {
			if (!map[it.id]) map[it.id] = { p1: idx * 0.9 + 0.3, p2: idx * 1.3 + 1.1 };
		});
		phasesRef.current = map;
	}, [items]);

	// continuous idle tilt (no hover required)
	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const amplitude = 14; // degrees (stronger sway)
		const speed = 0.0016; // radians per ms
		const loop = () => {
			const t = (performance.now() - start) * speed;
			const next: Record<string, { rx: number; ry: number }> = {};
			for (const it of items) {
				const ph = phasesRef.current[it.id] || { p1: 0, p2: 0 };
				next[it.id] = {
					rx: Math.sin(t + ph.p1) * amplitude,
					ry: Math.cos(t + ph.p2) * amplitude,
				};
			}
			setTiltById(next);
			raf = requestAnimationFrame(loop);
		};
		runOnceAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [items]);

	function runOnceAnimationFrame(fn: () => void) {
		requestAnimationFrame(fn);
	}

	const orderedItems = useMemo(() => {
		if (!activeId) return items;
		return items.slice().sort((a, b) => (a.id === activeId ? 1 : 0) - (b.id === activeId ? 1 : 0));
	}, [items, activeId]);

	const defaultFront = "/cards/front/cover.png";

	const handlePress = (id: string) => {
		// flip on press and toggle focus to center
		setFlippedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
		setActiveId((prev) => (prev === id ? null : id));
	};

	return (
		<div className="relative" style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}>
			{orderedItems.map((item) => {
				const isActive = activeId === item.id;
				// Only allow the active (foreground) card to show its back side
				const isFlipped = isActive && flippedIds.has(item.id);
				const { rx = 0, ry = 0 } = tiltById[item.id] || {};

				// translation required to move card center to stage center
				const dx = STAGE_WIDTH / 2 - (item.x + BASE_WIDTH / 2);
				const dy = STAGE_HEIGHT / 2 - (item.y + BASE_HEIGHT / 2);
				const scale = isActive ? 2 : 1;
				const activeOffsetX = -120; // shift active (foreground) card slightly left

				const transform = `translate(${isActive ? dx + activeOffsetX : 0}px, ${isActive ? dy : 0}px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)`;

				const cardProps: Card3DProps = {
					id: item.id,
					title: item.title ?? "",
					description: item.description ?? "",
					frontImageSrc: item.frontImageSrc ?? defaultFront,
					backImageSrc: item.backImageSrc,
					isActive,
					isFlipped,
					onPress: () => handlePress(item.id),
					width: BASE_WIDTH,
					height: BASE_HEIGHT,
				};

				return (
					<div
						key={item.id}
						className="absolute will-change-transform"
						style={{
							left: item.x,
							top: item.y,
							width: BASE_WIDTH,
							height: BASE_HEIGHT,
							zIndex: isActive ? 100 : 1,
							transform,
							transformOrigin: "center",
							transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
						}}
					>
						<Card3D {...cardProps} />
					</div>
				);
			})}
		</div>
	);
}
