import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/i18n/utils";

interface ContactFormProps {
	t: Translations;
}

export function ContactForm({ t }: ContactFormProps) {
	return (
		<form className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<label
						htmlFor="name"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
					>
						{t.contactUs.formName}
					</label>
					<input
						type="text"
						id="name"
						placeholder={t.contactUs.formPlaceholder}
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
					>
						{t.contactUs.formEmail}
					</label>
					<input
						type="email"
						id="email"
						placeholder={t.contactUs.formPlaceholder}
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="subject"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
				>
					{t.contactUs.formSubject}
				</label>
				<input
					type="text"
					id="subject"
					placeholder={t.contactUs.formPlaceholder}
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="message"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
				>
					{t.contactUs.formMessage}
				</label>
				<textarea
					id="message"
					placeholder={t.contactUs.formPlaceholder}
					rows={6}
					className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>

			<Button
				type="submit"
				variant="default"
				effect="gooeyRight"
				icon={ArrowRight}
				iconPlacement="right"
			>
				{t.contactUs.formSubmit}
			</Button>
		</form>
	);
}
