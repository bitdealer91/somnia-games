import CardsScene from "./components/CardsScene";
import { cards } from "./data/cards";
import StageScaler from "./components/StageScaler";

export default function Home() {
	return (
		<div className="min-h-screen w-full relative page-bg" style={{ backgroundImage: "url('/BG 1.png')" }}>
			<StageScaler baseWidth={1716} baseHeight={1023} align="top-left" offsetX={185}>
				{/* Text overlay per Figma */}
				<div className="pointer-events-none absolute" style={{ left: -185, top: 0, width: 1716, height: 1023 }}>
					<img src="/Text%201.png" alt="heading" width={858} height={512} className="headline-img" />
				</div>
				{/* Joystick per Figma */}
				<div className="pointer-events-none absolute joystick" style={{ width: 1013, height: 604 }}>
					<img src="/joystick.gif" alt="joystick" width={1013} height={604} />
				</div>
				{/* Cards stage */}
				<div className="relative" style={{ width: 1716, height: 1023 }}>
					<CardsScene items={cards} />
				</div>
			</StageScaler>
		</div>
	);
}
