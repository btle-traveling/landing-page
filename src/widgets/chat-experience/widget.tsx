import { Brain, Clock, Sparkles, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const messages = [
	{ id: "m1", text: "I like quiet places, not touristy", sender: "user" },
	{ id: "m2", text: "Make it more budget-friendly", sender: "user" },
	{ id: "m3", text: "Add halal food options", sender: "user" },
];

const benefits = [
	{
		id: "b1",
		title: "Understands context",
		icon: <Brain className="w-5 h-5" />,
		description:
			"It knows you mean 'quiet' refers to the atmosphere, not just noise level.",
	},
	{
		id: "b2",
		title: "Remembers preferences",
		icon: <Clock className="w-5 h-5" />,
		description:
			"No need to repeat yourself. It recalls your budget and dietary needs.",
	},
	{
		id: "b3",
		title: "Adapts instantly",
		icon: <Zap className="w-5 h-5" />,
		description: "Change plans on the fly. The itinerary updates in real-time.",
	},
];

const SplitViewVariant = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
			<div className="space-y-8 order-2 md:order-1">
				<div className="space-y-4">
					<h3 className="text-4xl font-bold tracking-tight">
						Speak naturally. <br /> Be understood.
					</h3>
					<p className="text-lg text-muted-foreground">
						Don't waste time with filters. Just describe your dream trip, and
						let our AI handle the rest.
					</p>
				</div>

				<div className="grid gap-6">
					{benefits.map((b) => (
						<div key={b.id} className="flex gap-4">
							<div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary h-fit">
								{b.icon}
							</div>
							<div>
								<h4 className="font-medium text-foreground">{b.title}</h4>
								<p className="text-muted-foreground/80">{b.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="relative order-1 md:order-2">
				<div className="absolute -inset-4 bg-linear-to-tr from-primary/20 via-primary/5 to-transparent rounded-[2rem] blur-xl" />
				<div className="relative bg-card/30 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl">
					<div className="flex items-center justify-between border-b border-white/5 pb-4">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
								<Sparkles className="w-4 h-4" />
							</div>
							<div>
								<div className="text-sm font-semibold">BTLE Assistant</div>
								<div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
									<span className="relative flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
										<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
									</span>
									Online
								</div>
							</div>
						</div>
						<div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
							BETA
						</div>
					</div>

					<div className="space-y-6">
						{/* AI Greeting */}
						<div className="flex gap-4">
							<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
								<Brain className="w-4 h-4 text-primary" />
							</div>
							<div className="p-4 rounded-2xl rounded-tl-sm bg-secondary/40 border border-white/5 text-sm">
								<p>Hi! Where are you dreaming of going next?</p>
							</div>
						</div>

						{/* User Requirements */}
						<div className="space-y-3">
							{messages.map((msg, i) => (
								<motion.div
									key={msg.id}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.3 }}
									className="flex gap-4 flex-row-reverse"
								>
									<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden">
										<img
											src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
											alt="User"
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="p-3 px-4 rounded-2xl rounded-tr-sm bg-primary/90 text-primary-foreground text-sm shadow-sm max-w-[80%]">
										{msg.text}
									</div>
								</motion.div>
							))}
						</div>

						{/* Processing Indicator */}
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ delay: 1.5 }}
							className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
						>
							<div className="flex gap-1 h-3 items-center">
								<motion.div
									animate={{ height: [4, 12, 4] }}
									transition={{ repeat: Infinity, duration: 1 }}
									className="w-1 bg-primary rounded-full"
								/>
								<motion.div
									animate={{ height: [4, 12, 4] }}
									transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
									className="w-1 bg-primary rounded-full"
								/>
								<motion.div
									animate={{ height: [4, 12, 4] }}
									transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
									className="w-1 bg-primary rounded-full"
								/>
							</div>
							<span className="text-xs text-muted-foreground font-medium">
								Generating your personal itinerary...
							</span>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function ChatExperienceWidget() {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3 }}
			>
				<SplitViewVariant />
			</motion.div>
		</AnimatePresence>
	);
}
