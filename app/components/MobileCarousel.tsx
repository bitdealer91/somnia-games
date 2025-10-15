"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MobileCarouselItem = {
  id: string;
  frontSrc: string; // cover image
  backSrc?: string; // detailed image
  websiteUrl?: string;
  xUrl?: string;
};

type Props = {
  items: MobileCarouselItem[];
};

// This carousel is tailored for a 390x844 frame with Screen2 layout numbers
export default function MobileCarousel({ items }: Props) {
  const [active, setActive] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [time, setTime] = useState(0);
  const phasesRef = useRef<number[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const count = items.length;

  const CARD_PEEK = 73; // how much of side card peeks into view
  const CARD_GAP = 16;
  const FRAME_W = 390;
  const CARD_W = FRAME_W - CARD_PEEK; // snapped column width

  // helper: programmatic navigation if ever needed
  const move = useCallback((dir: number) => {
    const next = (active + dir + count) % count;
    setActive(next);
    const node = carouselRef.current?.children[next] as HTMLElement | undefined;
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active, count]);

  // detect active index on scroll (snap end)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const column = CARD_W + CARD_GAP;
        const idx = Math.round(el.scrollLeft / column);
        if (idx !== active) {
          setActive((idx + count) % count);
          setIsFlipped(false);
        }
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [active, count, CARD_W, CARD_GAP]);

  // no triplet layout in scroll-snap mode

  // idle sway like desktop: small rotate/translate oscillation
  useEffect(() => {
    if (phasesRef.current.length !== 3) {
      phasesRef.current = [0.2, 0.9, 1.6];
    }
    let raf = 0;
    const start = performance.now();
    const speed = 0.002; // radians per ms
    const loop = () => {
      const t = (performance.now() - start) * speed;
      setTime(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sway = (idx: number) => {
    const phase = phasesRef.current[idx] || 0;
    const deg = Math.sin(time + phase) * 3; // +/-3deg
    const dy = Math.cos(time + phase) * 4; // +/-4px
    return { deg, dy };
  };

  // hover-like micro motion

  return (
    <div className="absolute inset-0" style={{ zIndex: 3 }}>
      <div
        ref={carouselRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: `${CARD_W}px`,
          gap: `${CARD_GAP}px`,
          overflowX: "auto",
          paddingLeft: `${CARD_GAP}px`,
          paddingRight: `${CARD_GAP}px`,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((it, i) => {
          const isActive = i === active;
          return (
            <div key={it.id} style={{ scrollSnapAlign: "center", position: "relative" }}>
              <div
                onClick={() => {
                  if (!isActive) {
                    const node = carouselRef.current?.children[i] as HTMLElement | undefined;
                    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                    return;
                  }
                  setIsFlipped((v) => !v);
                }}
                style={{
                  position: "relative",
                  width: `${CARD_W}px`,
                  height: 353 + 175, // space for top offset
                  cursor: "pointer",
                  transform: `translateY(${sway(i).dy}px) scale(${isActive && isFlipped ? 1.3 : 1})`,
                  transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
                  transformOrigin: "center",
                  perspective: 1200,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 175,
                    height: 353,
                    margin: "0 auto",
                    width: 248,
                    transformStyle: "preserve-3d",
                    transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
                    transform: `rotateY(${isActive && isFlipped ? 180 : 0}deg)`,
                  }}
                >
                  <img src={it.frontSrc} alt="front" style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 12, boxShadow: "0 10px 22px rgba(0,0,0,0.35)" }} />
                  <div style={{ position: "absolute", inset: 0, transform: "rotateY(180deg)", backfaceVisibility: "hidden", borderRadius: 12, boxShadow: "0 10px 22px rgba(0,0,0,0.35)" }}>
                    <img src={it.backSrc || it.frontSrc} alt="back" style={{ position: "absolute", inset: 0, borderRadius: 12 }} />
                    {it.websiteUrl && (
                      <a href={it.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ position: "absolute", left: "13%", top: "58%", width: "74%", height: "8%" }} aria-label="website" />
                    )}
                    {it.xUrl && (
                      <a href={it.xUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ position: "absolute", left: "18%", top: "74%", width: "60%", height: "8%" }} aria-label="X" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


