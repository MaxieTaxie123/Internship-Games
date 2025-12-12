type Translations = {
	[lang: string]: {
		[key: string]: string;
	};
};

export const translations: Translations = {};

let currentLang = 'en';

export async function networkLanguageLoader(lang: string) {
	try {
		const translationObject = await fetch(`./translations/${lang}.json`).then((res) => res.json());
		translations[lang] = translationObject;
	} catch (e) {
		console.error('translation language not found!', e);
	}
}

export async function setLanguage(lang: string, loader?: undefined | ((lang: string) => Promise<void>)): Promise<void> {
	if (!translations[lang] && loader) {
		await loader(lang);
	}
	currentLang = lang;
	document.documentElement.lang = lang;
}

export function getTranslationArray(key: string): string[] {
	if (!translations[currentLang] || !translations[currentLang][key]) {
		if (!missingTranslations.has(key)) {
			console.error(`missing template: ${currentLang}:${key}`);
			missingTranslations.add(key);
		}
		return [];
	} else {
		const returnValue = translations[currentLang][key];
		if (Array.isArray(returnValue)) return returnValue;
		console.error(`Is not an array: ${currentLang}:${key}`);
		return [returnValue];
	}
}

const missingTranslations = new Set<string>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function __(strings: TemplateStringsArray | string[], ...values: any[]): string {
	let tmplKey: string;

	// Normalize input to a single string key
	if (Array.isArray(strings)) {
		// Handle TemplateStringsArray and string[]
		tmplKey = (strings as string[]).join('%');
	} else {
		tmplKey = strings.raw.join('%');
	}

	let tmpl = tmplKey;
	// NOTE: we compare against undefined because we want to allow for empty strings
	if (translations[currentLang] === undefined || translations[currentLang][tmplKey] === undefined) {
		if (!missingTranslations.has(tmplKey)) {
			console.error(`missing template: ${currentLang}:${tmplKey}`);
			missingTranslations.add(tmplKey);
		}
	} else {
		tmpl = translations[currentLang][tmplKey] ?? '';
	}

	let index = 0;
	tmpl = tmpl.replace(/(\\%)|(%)/g, (match) => {
		if (match === '\\%') {
			return '%'; // Unescape the escaped '%'
		}
		if (match === '%') {
			return values[index++]; // Replace '%' with the corresponding value
		}
		return match;
	});

	return tmpl;
}

// expose __ globally
globalThis.__ = __;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function __(strings: TemplateStringsArray | string[], ...values: any[]): string;
}
