import * as React from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Destination {
	id: string;
	name: string;
	description: string;
	image: string;
}

interface DestinationsCarouselProps {
	destinations: Destination[];
	t: any;
}

export function DestinationsCarousel({
	destinations,
	t,
}: DestinationsCarouselProps) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);

	React.useEffect(() => {
		if (!api) return;

		setCurrent(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<div className="w-full max-w-350 mx-auto px-4">
			<Carousel
				setApi={setApi}
				opts={{
					align: "center",
					loop: true,
					containScroll: "keepSnaps",
					startIndex: 2,
					active: true,
					skipSnaps: true,
				}}
				className="w-full relative h-full"
			>
				<CarouselContent className="-ml-4 md:-ml-8 items-center py-10">
					{destinations.map((dest, index) => (
						<CarouselItem
							key={dest.id}
							className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						>
							{/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
							{/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								className={cn(
									"relative rounded-[32px] overflow-hidden transition-all duration-500 ease-in-out cursor-pointer group",
									current === index
										? "h-[450px] opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
										: "h-[450px] opacity-40 blur-[0.5px] grayscale-[20%] group-hover:opacity-60",
								)}
								onClick={() => api?.scrollTo(index)}
							>
								<img
									src={dest.image}
									alt={dest.name}
									className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>

								{/* Overlay card */}
								<div
									className={cn(
										"absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 transition-all duration-500 transform",
										current === index
											? "translate-y-0 opacity-100"
											: "translate-y-10 opacity-0",
									)}
								>
									<h3 className="text-2xl font-bold text-white mb-2">
										{dest.name}
									</h3>
									<p className="text-sm text-white/70 line-clamp-2 mb-4">
										{dest.description}
									</p>
									<div className="flex justify-between items-center">
										<button
											type="button"
											className="px-6 py-2 rounded-xl bg-[#10b981] text-white font-semibold text-sm hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-900/20"
										>
											Explore
										</button>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="absolute top-[48%] -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-20 pointer-events-none z-20">
					<CarouselPrevious className="static translate-y-0 h-14 w-14 border-white/20 bg-white/5 hover:bg-white/20 text-white pointer-events-auto shadow-2xl backdrop-blur-sm" />
					<CarouselNext className="static translate-y-0 h-14 w-14 border-white/20 bg-white/5 hover:bg-white/20 text-white pointer-events-auto shadow-2xl backdrop-blur-sm" />
				</div>

				{/* Custom Pagination */}
				<div className="flex items-center justify-center mt-12 overflow-hidden px-4">
					<div className="flex items-center">
						{destinations.map((dest, index) => (
							<React.Fragment key={`page-${dest.id}`}>
								<button
									type="button"
									onClick={() => api?.scrollTo(index)}
									className={cn(
										"flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-500 font-bold flex-shrink-0 z-10",
										current === index
											? "bg-[#10b981] border-transparent text-white scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
											: "bg-[#1a1a1a] border-white/10 text-white/40 hover:text-white",
									)}
								>
									{dest.id}
								</button>
								{index < destinations.length - 1 && (
									<div className="w-10 sm:w-20 h-px mx-1 relative overflow-hidden">
										<div className="absolute inset-0 border-t border-dashed border-white/20" />
										<div
											className={cn(
												"absolute inset-0 border-t-2 border-[#10b981] transition-all duration-700",
												current > index ? "w-full" : "w-0",
											)}
										/>
									</div>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			</Carousel>
		</div>
	);
}
