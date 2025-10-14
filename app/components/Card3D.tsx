"use client";

import Image from "next/image";
import { useMemo } from "react";

export type Card3DProps = {
	id: string;
	title?: string;
	description?: string;
	frontImageSrc?: string;
	backImageSrc?: string;
	isActive: boolean;
	isFlipped: boolean;
	onPress: () => void;
	width?: number; // px
	height?: number; // px
};

export default function Card3D(props: Card3DProps) {
	const { title = "", description = "", frontImageSrc, backImageSrc, isActive, isFlipped, onPress, width = 184, height = 260 } = props;

	const front = useMemo(() => {
		return (
			<div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden rounded-[12px]">
				{frontImageSrc ? (
					<Image src={frontImageSrc} alt={title} fill sizes={`${width}px`} className="object-cover" priority={isActive} />
				) : (
					<div className="h-full w-full bg-black" />
				)}
			</div>
		);
	}, [frontImageSrc, isActive, title, width]);

	const back = useMemo(() => {
		return (
			<div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden rounded-[12px]">
				{backImageSrc ? (
					<Image src={backImageSrc} alt={`${title} back`} fill sizes={`${width}px`} className="object-cover" priority={isActive} />
				) : (
					<div className="h-full w-full bg-black" />
				)}
			</div>
		);
	}, [backImageSrc, isActive, title, width]);

	return (
		<button type="button" onClick={onPress} className="relative cursor-pointer select-none" aria-pressed={isFlipped} style={{ width, height }}>
			<div className="relative h-full w-full [perspective:1400px]">
				<div className={"relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] " + (isFlipped ? "[transform:rotateY(180deg)]" : "") }>
					{front}
					{back}
				</div>
			</div>
		</button>
	);
}
