"use client";
import MobileCarousel from "./MobileCarousel";

export default function MobileScreen2() {
  return (
    <div className="mobile-screen" aria-label="Mobile Screen2 layout">
      <div className="mobile-stage">
        {/* BG 1 base plate under BG3 (per Figma) */}
        <img src="/mobile/BG 1.png" alt="bg1" style={{ position: "absolute", left: 0, bottom: 0, width: 390, height: "auto", zIndex: 0 }} />
        {/* BG 3 overlay per Figma */}
        <img src="/mobile/BG 3.png" alt="bg3" style={{ position: "absolute", left: 0, top: 44, width: 390, height: "auto", zIndex: 1 }} />

        {/* Joystick/image_1 per Figma */}
        {/* Center joystick horizontally and pin slightly above bottom; larger scale */}
        <img src="/mobile/image_1.gif" alt="joystick" style={{ position: "absolute", left: "50%", bottom: 12, transform: "translateX(-50%)", width: 780, height: "auto", zIndex: 2, pointerEvents: "none" }} />

        <MobileCarousel
          items={[
            { id: "c1", frontSrc: "/cards/front/cover.png", backSrc: "/cards/back/card-1.png", websiteUrl: "https://surviv.fun/", xUrl: "https://x.com/survivfun" },
            { id: "c2", frontSrc: "/cards/front/cover.png", backSrc: "/cards/back/card-2.png", websiteUrl: "https://neuroguardians.com/", xUrl: "https://x.com/NeuroGuardians" },
            { id: "c3", frontSrc: "/cards/front/cover.png", backSrc: "/cards/back/card-3.png", websiteUrl: "https://play.intraverse.io/", xUrl: "https://x.com/intraVerse_Game" },
            { id: "c4", frontSrc: "/cards/front/cover.png", backSrc: "/cards/back/card-4.png", websiteUrl: "https://warzonewarriors.xyz/", xUrl: "https://x.com/Warzone_somi" },
            { id: "c5", frontSrc: "/cards/front/cover.png", backSrc: "/cards/back/card-5.png", websiteUrl: "https://www.playvariance.com/", xUrl: "https://x.com/playvariance" },
          ]}
        />
      </div>
    </div>
  );
}


