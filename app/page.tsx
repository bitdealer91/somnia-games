/* eslint-disable @next/next/no-img-element */
import CardsScene from "./components/CardsScene";
import { cards } from "./data/cards";
import MobileScreen2 from "./components/MobileScreen2";
import StageScaler from "./components/StageScaler";

export default function Home() {
	return (
		<div className="min-h-screen w-full relative page-bg" style={{ backgroundImage: "url('/BG 1.png')" }}>
			{/* Portrait: render Figma Screen2 layout */}
			<div className="portrait-only" style={{ width: "100%", height: "100%" }}>
				<MobileScreen2 />
			</div>
			{/* Landscape/Desktop: original stage */}
			<div className="landscape-only" style={{ width: "100%", height: "100%" }}>
				<StageScaler baseWidth={1716} baseHeight={1023} align="top-left" offsetX={185}>
				{/* Text overlay per Figma */}
				<div className="pointer-events-none absolute" style={{ left: -185, top: 0, width: 1716, height: 1023 }}>
					<img src="/Text%201.png" alt="heading" width={858} height={512} className="headline-img" />
				</div>
				{/* Joystick per Figma */}
				<div className="pointer-events-none absolute joystick" style={{ width: 1013, height: 604 }}>
					<img src="/joystick.gif" alt="joystick" width={1013} height={604} className="landscape-only" />
					<img src="/mobile/image_1.gif" alt="joystick-mobile" width={1013} height={604} className="portrait-only" />
				</div>
				{/* Cards stage */}
				<div className="relative" style={{ width: 1716, height: 1023 }}>
					<CardsScene items={cards} />
				</div>
				</StageScaler>
			</div>
		</div>
	);
}
