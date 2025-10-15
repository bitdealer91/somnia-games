"use client";

import { useState } from "react";

type JoystickProps = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export default function Joystick({ left, top, width, height }: JoystickProps) {
  const [useVideo, setUseVideo] = useState(true);

  return (
    <div
      className="pointer-events-none absolute"
      style={{ left, top, width, height, isolation: "isolate" }}
    >
      {useVideo ? (
        <video
          width={width}
          height={height}
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          onError={() => setUseVideo(false)}
          style={{
            display: "block",
            width,
            height,
            objectFit: "contain",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        >
          <source src="/joystick.webm" type="video/webm" />
          <source src="/joystick.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/joystick.gif"
          alt="joystick"
          width={width}
          height={height}
          style={{
            imageRendering: "-webkit-optimize-contrast",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
      )}
    </div>
  );
}





