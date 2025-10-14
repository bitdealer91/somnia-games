export type CardData = {
	id: string;
	title?: string;
	description?: string;
	frontImageSrc?: string;
	backImageSrc?: string;
	x: number;
	y: number;
};

export const cards: CardData[] = [
	{
		id: "card-1",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-1.png",
		x: 3,
		y: 128,
	},
	{
		id: "card-2",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-2.png",
		x: 319,
		y: 128,
	},
	{
		id: "card-3",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-3.png",
		x: 636,
		y: 128,
	},
	{
		id: "card-4",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-4.png",
		x: 953,
		y: 128,
	},
	{
		id: "card-5",
		title: "",
		description: "",
		backImageSrc: "/cards/back/card-5.png",
		x: 1269,
		y: 128,
	},
];
