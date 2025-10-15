"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  const [showDetail, setShowDetail] = useState<null | MobileCarouselItem>(null);
  const startX = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [time, setTime] = useState(0);
  const phasesRef = useRef<number[]>([]);

  const count = items.length;

  const move = useCallback(
    (dir: number) => {
      setActive((a) => (a + dir + count) % count);
    },
    [count]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsSnapping(false);
    setDragX(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const d = e.touches[0].clientX - startX.current;
    setDragX(d);
  };
  const onTouchEnd = () => {
    const threshold = 60;
    const w = 390; // frame width
    if (Math.abs(dragX) > threshold) {
      setIsSnapping(true);
      const dir = dragX < 0 ? -1 : 1;
      setDragX(dir * (w + 40));
      setTimeout(() => {
        move(dir === -1 ? 1 : -1);
        setIsSnapping(false);
        setDragX(0);
      }, 260);
    } else {
      setIsSnapping(true);
      setDragX(0);
      setTimeout(() => setIsSnapping(false), 220);
    }
  };

  const triplet = useMemo(() => {
    const prev = (active - 1 + count) % count;
    const next = (active + 1) % count;
    return [items[prev], items[active], items[next]];
  }, [active, count, items]);

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

  // rolling effect factors
  const w = 390;
  const p = Math.max(-1, Math.min(1, dragX / w));
  const scaleCenter = 1 - 0.2 * Math.abs(p);
  // side cards keep full scale; only parallax/rotation to mimic crop, not shrink
  const scaleLeft = 1;
  const scaleRight = 1;

  return (
    <div className="absolute inset-0" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ zIndex: 3 }}>
      {/* Track moves entire triplet so вся карточка едет целиком */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${dragX}px)`,
          transition: isSnapping ? "transform 260ms cubic-bezier(0.22,1,0.36,1)" : undefined,
          willChange: "transform",
          zIndex: 3,
        }}
      >
      {/* left card */}
      {/* left full card (mostly offscreen, shows ~73px) */}
      <img
        src={triplet[0].frontSrc}
        alt="left"
        style={{
          position: "absolute",
          left: -175, // -(248-73)
          top: 184,
          width: 248,
          height: 344,
          zIndex: 3,
          transform: `translateY(${sway(0).dy}px) rotateY(${p * 10}deg) rotateZ(${sway(0).deg}deg)`,
          transition: isSnapping ? "transform 260ms ease-out" : undefined,
          transformOrigin: "center",
          pointerEvents: "none",
        }}
      />
      {/* center card */}
      <img
        src={triplet[1].frontSrc}
        alt="center"
        onClick={() => setShowDetail(triplet[1])}
        style={{
          position: "absolute",
          left: 71,
          top: 175,
          width: 248,
          height: 353,
          zIndex: 4,
          cursor: "pointer",
          transform: `translateY(${sway(1).dy}px) scale(${scaleCenter}) rotateZ(${sway(1).deg}deg)`,
          transition: isSnapping ? "transform 260ms ease-out" : undefined,
          transformOrigin: "center",
        }}
      />
      {/* right card */}
      {/* right full card (mostly offscreen, shows ~73px) */}
      <img
        src={triplet[2].frontSrc}
        alt="right"
        style={{
          position: "absolute",
          left: 317,
          top: 178,
          width: 248,
          height: 354,
          zIndex: 3,
          transform: `translateY(${sway(2).dy}px) rotateY(${p * -10}deg) rotateZ(${sway(2).deg}deg)`,
          transition: isSnapping ? "transform 260ms ease-out" : undefined,
          transformOrigin: "center",
          pointerEvents: "none",
        }}
      />
      </div>
      {/* detail overlay (Screen3-like) */}
      {showDetail && (
        <div
          className="absolute inset-0 bg-black/80"
          onClick={() => setShowDetail(null)}
          style={{ zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: "relative", width: 300 }}>
              <img
                src={showDetail.backSrc || showDetail.frontSrc}
                alt="detail"
                style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
              />
              {/* clickable hotspots aligned to fields on the back side */}
              {/* WEBSITE field area */}
              {showDetail.websiteUrl && (
                <a
                  href={showDetail.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  /* approx area covering the WEBSITE value row */
                  style={{ position: "absolute", left: "13%", top: "58%", width: "74%", height: "8%", zIndex: 2 }}
                  aria-label="website"
                />
              )}
              {/* X handle area */}
              {showDetail.xUrl && (
                <a
                  href={showDetail.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  /* approx area covering the X handle row */
                  style={{ position: "absolute", left: "18%", top: "74%", width: "60%", height: "8%", zIndex: 2 }}
                  aria-label="X"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


