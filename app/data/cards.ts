export type CardData = {
	id: string;
	title?: string;
	description?: string;
	frontImageSrc?: string;
	backImageSrc?: string;
    websiteUrl?: string;
    xUrl?: string;
	x: number;
	y: number;
};

export const cards: CardData[] = [
	{
		id: "card-1",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-1.png",
		websiteUrl: "https://surviv.fun/",
		xUrl: "https://x.com/survivfun",
		x: 3,
		y: 128,
	},
	{
		id: "card-2",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-2.png",
		websiteUrl: "https://neuroguardians.com/",
		xUrl: "https://x.com/NeuroGuardians",
		x: 319,
		y: 128,
	},
	{
		id: "card-3",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-3.png",
		websiteUrl: "https://play.intraverse.io/",
		xUrl: "https://x.com/intraVerse_Game",
		x: 636,
		y: 128,
	},
	{
		id: "card-4",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-4.png",
		websiteUrl: "https://warzonewarriors.xyz/",
		xUrl: "https://x.com/Warzone_somi",
		x: 953,
		y: 128,
	},
	{
		id: "card-5",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-5.png",
		websiteUrl: "https://www.playvariance.com/",
		xUrl: "https://x.com/playvariance",
		x: 1269,
		y: 128,
	},
];
