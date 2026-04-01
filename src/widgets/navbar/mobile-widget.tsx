import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationItems } from "./items";

export function MobileNavbar() {
	return (
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/10"
					>
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-screen max-w-[300px] bg-[#1A1A1A] border-white/10 text-white"
					align="end"
				>
					<DropdownMenuGroup className="p-2">
						{navigationItems.map((item, index) => (
							<DropdownMenuItem
								key={index}
								className="focus:bg-white/10 focus:text-white rounded-lg cursor-pointer"
							>
								<a
									href={item.href}
									className="w-full py-2 text-sm font-semibold tracking-widest"
								>
									{item.title}
								</a>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
