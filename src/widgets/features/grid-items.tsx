import {
	Brain,
	Lightbulb,
	Lock,
	ShieldCheck,
	Sparkles,
	TrendingDown,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

export function GridItems() {
	return (
		<BentoGrid className="md:auto-rows-[35rem] gap-8 mx-auto">
			{items.map((item, i) => (
				<BentoGridItem
					key={item.title}
					title={item.title}
					description={
						<div className="flex flex-col gap-4">
							<span className="text-muted-foreground leading-relaxed text-sm md:text-base">
								{item.description}
							</span>
						</div>
					}
					header={item.header}
					icon={item.icon}
					className={cn(
						"cursor-pointer overflow-hidden transition-all duration-500 group shadow-2xl",
						i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1",
					)}
				/>
			))}
		</BentoGrid>
	);
}

const IconWrapper = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={cn(
			"w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-2xl",
			className,
		)}
	>
		{children}
	</div>
);

const items = [
	{
		title: "All-in-One AI Ecosystem",
		description:
			"BTLE is the single interface for the entire journey. Users can book flights, find hotels, and get local visa advice in one continuous chat thread. No more tab switching.",
		footer: "10 hours of planning in 10 minutes.",
		header: (
			<div className="w-full max-h-80 relative overflow-hidden">
				<img
					src="/images/ai-ecosystem.webp"
					alt="AI Travel Assistant"
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
			</div>
		),
		icon: (
			<IconWrapper className="bg-blue-600 text-white shadow-blue-500/20">
				<Brain className="h-6 w-6" />
			</IconWrapper>
		),
	},
	{
		title: "Hyper-Localized Native",
		description:
			"Built specifically for the 80M people global giants forgot. Our AI speaks local languages and understands local context.",
		footer: "We speak their language - literally and culturally.",
		header: (
			<div className="w-full max-h-80 relative overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200"
					alt="Samarkand Cityscape"
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
				<div className="absolute top-6 left-6 flex flex-wrap gap-2">
					{["O'zbekcha", "Русский", "English"].map((lang) => (
						<span
							key={lang}
							className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-widest text-white"
						>
							{lang}
						</span>
					))}
				</div>
			</div>
		),
		icon: (
			<IconWrapper className="bg-sky-500 text-white shadow-sky-500/20">
				<Lightbulb className="h-6 w-6" />
			</IconWrapper>
		),
	},
	{
		title: "Predictive Intelligence",
		description:
			"An Agent that predicts price drops, warns you about rules, and suggests the perfect plan based on your needs.",
		footer: "Users book as they feel guided, not overwhelmed.",
		header: (
			<div className="w-full max-h-80 relative flex items-center justify-center overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200"
					alt="Global Analytics"
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
				<div className="relative z-10 flex flex-col items-center gap-4">
					<Sparkles className="h-20 w-20 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-pulse" />
					<div className="px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md">
						<span className="text-emerald-400 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1">
							<TrendingDown className="h-3 w-3" /> Price Drop Predicted
						</span>
					</div>
				</div>
			</div>
		),
		icon: (
			<IconWrapper className="bg-blue-400 text-white shadow-blue-400/20">
				<Sparkles className="h-6 w-6" />
			</IconWrapper>
		),
	},
	{
		title: "Native Secure Booking",
		description:
			"No redirects. We are the Merchant of Record. Transactions happen 100% inside the chat. We integrate directly with Uzcard & Humo, creating a banking-grade security layer.",
		footer: "Zero 'Redirect Anxiety.' Users pay us, a brand they trust.",
		header: (
			<div className="w-full max-h-80 relative flex items-center justify-center p-12 overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200"
					alt="Secure Transaction"
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

				<div className="relative z-10 flex flex-col items-center gap-8 w-full">
					<div className="flex gap-4 items-center">
						<div className="px-6 py-2.5 bg-blue-600 rounded-xl text-white font-black text-xl shadow-2xl transform transition-transform">
							UZCARD
						</div>
						<div className="px-6 py-2.5 bg-orange-500 rounded-xl text-white font-black text-xl shadow-2xl transform transition-transform">
							HUMO
						</div>
					</div>
					<div className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/20 backdrop-blur-md">
						<Lock className="h-4 w-4 text-emerald-400" />
						<span className="text-white text-[10px] font-bold uppercase tracking-widest">
							Secure Checkout Active
						</span>
					</div>
				</div>
			</div>
		),
		icon: (
			<IconWrapper className="bg-blue-700 text-white shadow-blue-700/20">
				<ShieldCheck className="h-6 w-6" />
			</IconWrapper>
		),
	},
];
