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
    websiteUrl?: string;
    xUrl?: string; // X (Twitter)
    websiteHotspot?: { x: number; y: number; width: number; height: number }; // coordinates in base size 184x260
    xHotspot?: { x: number; y: number; width: number; height: number };
};

export default function Card3D(props: Card3DProps) {
    const { title = "", description = "", frontImageSrc, backImageSrc, isActive, isFlipped, onPress, width = 184, height = 260, websiteUrl, xUrl, websiteHotspot, xHotspot } = props;

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

    function handleClick() {
        // Card click keeps existing interaction (focus/flip), links handled by hotspots on the back
        onPress();
    }

    return (
        <button type="button" onClick={handleClick} className="relative cursor-pointer select-none" aria-pressed={isFlipped} style={{ width, height }}>
            <div className="relative h-full w-full [perspective:1400px]">
                <div className={"relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] " + (isFlipped ? "[transform:rotateY(180deg)]" : "") }>
                    {front}
                    {/* Back face with optional clickable hotspots */}
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden rounded-[12px]">
                        {backImageSrc ? (
                            <Image src={backImageSrc} alt={`${title} back`} fill sizes={`${width}px`} className="object-cover" priority={isActive} />
                        ) : (
                            <div className="h-full w-full bg-black" />
                        )}
                        {isFlipped && websiteUrl && (
                            <a
                                href={websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${title} website`}
                                className="absolute"
                                style={{
                                    left: ((websiteHotspot?.x ?? 24) * (width / 184)),
                                    top: ((websiteHotspot?.y ?? 170) * (height / 260)),
                                    width: ((websiteHotspot?.width ?? 136) * (width / 184)),
                                    height: ((websiteHotspot?.height ?? 28) * (height / 260)),
                                }}
                            />
                        )}
                        {isFlipped && xUrl && (
                            <a
                                href={xUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${title} X link`}
                                className="absolute"
                                style={{
                                    left: ((xHotspot?.x ?? 24) * (width / 184)),
                                    top: ((xHotspot?.y ?? 200) * (height / 260)),
                                    width: ((xHotspot?.width ?? 90) * (width / 184)),
                                    height: ((xHotspot?.height ?? 24) * (height / 260)),
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
		</button>
	);
}
