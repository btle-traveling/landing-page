// Re-export shared constants
export { defaultLang, type Language, languages } from "./constants";

import { defaultLang, type Language, languages } from "./constants";

// Google Sheets CSV Export URL
const GOOGLE_SHEET_CSV_URL =
	"https://docs.google.com/spreadsheets/d/1gSzniXYJ0M7yZ78YnithF2PnvR8GmPFZFjqGZNHRP3Y/export?format=csv";

// Type for nested translation object
export interface Translations {
	nav: {
		features: string;
		compare: string;
		aboutUs: string;
		contactUs: string;
	};
	hero: {
		title: string;
		description: string;
		exploreNow: string;
		contactUs: string;
	};
	features: {
		badge: string;
		title: string;
		description: string;
		card1Title: string;
		card1Description: string;
		card2Title: string;
		card2Description: string;
		card3Title: string;
		card3Description: string;
		availableHours: string;
		daysLeft: string;
		hours: string;
		spent: string;
		projected: string;
		available: string;
		remaining: string;
	};
	comparison: {
		badge: string;
		title: string;
		description: string;
	};
	contactUs: {
		badge: string;
		title: string;
		description: string;
		infoTitle: string;
		infoDescription: string;
		formName: string;
		formEmail: string;
		formSubject: string;
		formMessage: string;
		formPlaceholder: string;
		formSubmit: string;
	};
	aboutUs: {
		badge: string;
		title: string;
		description: string;
		storyLabel: string;
		storyTitle: string;
		storyDescription: string;
		storyButton: string;
		missionLabel: string;
		missionTitle: string;
		missionDescription: string;
		missionButton: string;
		visionLabel: string;
		visionTitle: string;
		visionDescription: string;
		visionButton: string;
	};
	footer: {
		about: string;
		features: string;
		works: string;
		career: string;
		copyright: string;
		privacyPolicy: string;
		termsOfService: string;
	};
	destinations: {
		title: string;
		subtitle: string;
	};
	languageSwitcher: {
		label: string;
	};
}

// Cache for translations (populated at build time)
let translationsCache: Record<Language, Translations> | null = null;

/**
 * Parse CSV string into rows
 */
function parseCSV(csv: string): string[][] {
	const rows: string[][] = [];
	let currentRow: string[] = [];
	let currentCell = "";
	let insideQuotes = false;

	for (let i = 0; i < csv.length; i++) {
		const char = csv[i];
		const nextChar = csv[i + 1];

		if (char === '"') {
			if (insideQuotes && nextChar === '"') {
				currentCell += '"';
				i++; // Skip next quote
			} else {
				insideQuotes = !insideQuotes;
			}
		} else if (char === "," && !insideQuotes) {
			currentRow.push(currentCell);
			currentCell = "";
		} else if ((char === "\r" || char === "\n") && !insideQuotes) {
			if (char === "\r" && nextChar === "\n") {
				i++; // Skip \n in \r\n
			}
			if (currentCell || currentRow.length > 0) {
				currentRow.push(currentCell);
				rows.push(currentRow);
				currentRow = [];
				currentCell = "";
			}
		} else {
			currentCell += char;
		}
	}

	// Handle last row
	if (currentCell || currentRow.length > 0) {
		currentRow.push(currentCell);
		rows.push(currentRow);
	}

	return rows;
}

/**
 * Convert flat dot-notation key to nested object path
 */
function setNestedValue(
	obj: Record<string, unknown>,
	path: string,
	value: string,
): void {
	const keys = path.split(".");
	let current = obj;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!(key in current)) {
			current[key] = {};
		}
		current = current[key] as Record<string, unknown>;
	}

	current[keys[keys.length - 1]] = value;
}

/**
 * Fetch and parse translations from Google Sheets
 */
async function fetchTranslationsFromSheet(): Promise<
	Record<Language, Translations>
> {
	const response = await fetch(GOOGLE_SHEET_CSV_URL);
	if (!response.ok) {
		throw new Error(`Failed to fetch translations: ${response.statusText}`);
	}

	const csvText = await response.text();
	const rows = parseCSV(csvText);

	// First row is headers: key, en, uz, ru
	const headers = rows[0];
	const langIndices: Record<Language, number> = {
		en: headers.indexOf("en"),
		uz: headers.indexOf("uz"),
		ru: headers.indexOf("ru"),
	};

	// Initialize translation objects with empty sections to avoid "undefined" errors if keys are missing in the sheet
	const translations: Record<Language, Record<string, any>> = {
		en: {
			nav: {},
			hero: {},
			features: {},
			comparison: {},
			contactUs: {},
			aboutUs: {},
			destinations: {},
			footer: {
				privacyPolicy: "Privacy Policy",
				termsOfService: "Terms of Service",
			},
			languageSwitcher: {},
		},
		uz: {
			nav: {},
			hero: {},
			features: {},
			comparison: {},
			contactUs: {},
			aboutUs: {},
			destinations: {},
			footer: {
				privacyPolicy: "Maxfiylik siyosati",
				termsOfService: "Xizmat ko'rsatish shartlari",
			},
			languageSwitcher: {},
		},
		ru: {
			nav: {},
			hero: {},
			features: {},
			comparison: {},
			contactUs: {},
			aboutUs: {},
			destinations: {},
			footer: {
				privacyPolicy: "Политика конфиденциальности",
				termsOfService: "Условия использования",
			},
			languageSwitcher: {},
		},
	};

	// Process each row (skip header)
	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		const key = row[0];

		if (!key) continue;

		for (const lang of Object.keys(languages) as Language[]) {
			const value = row[langIndices[lang]] || "";
			setNestedValue(translations[lang], key, value);
		}
	}

	return translations as Record<Language, Translations>;
}

/**
 * Get translations for a specific language
 * Fetches from Google Sheets and caches the result
 */
export async function getTranslations(lang: Language): Promise<Translations> {
	if (!translationsCache) {
		translationsCache = await fetchTranslationsFromSheet();
	}

	return translationsCache[lang];
}

export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split("/");
	if (lang in languages) return lang as Language;
	return defaultLang;
}

export function getLocalizedPath(path: string, lang: Language): string {
	const cleanPath = path.replace(/^\//, "").replace(/^(en|uz|ru)\//, "");
	return `/${lang}/${cleanPath}`;
}

export function getLanguageFromPath(path: string): Language {
	const [, lang] = path.split("/");
	if (lang in languages) return lang as Language;
	return defaultLang;
}
