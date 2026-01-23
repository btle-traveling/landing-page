export interface Partner {
	name: string;
	logo: string;
	type: "backing" | "integration";
	description?: string;
	url?: string;
}

export const PARTNERS: Partner[] = [
	{
		name: "UzCombinator",
		logo: "/logos/uzcombinator.svg", // Will provide fallback
		type: "backing",
		description:
			"The Y-Combinator of Uzbekistan, fueling the next generation of tech startups.",
		url: "https://www.uzcombinator.uz/",
	},
	{
		name: "Easy Booking",
		logo: "/logos/easybooking.svg",
		type: "integration",
		description: "Seamless hotel and stay reservations across Central Asia.",
		url: "https://www.easybooking.uz/",
	},
	{
		name: "Duffel",
		logo: "/logos/duffel.svg",
		type: "integration",
		description: "Direct access to hundreds of airlines via modern API.",
		url: "https://www.duffel.com/",
	},
	{
		name: "Stripe",
		logo: "/logos/stripe.svg",
		type: "integration",
		description: "Secure, global payments infrastructure for travel.",
		url: "https://www.stripe.com/",
	},
];
