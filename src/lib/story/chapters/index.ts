import type { Language } from './types';

// Use static glob imports for each language (Vite requires static strings)
const jaChapters = import.meta.glob<{ chapter: { title: string; content: string } }>(
	'./ja/*.ts',
	{
		eager: true
	}
);

const enChapters = import.meta.glob<{ chapter: { title: string; content: string } }>(
	'./en/*.ts',
	{
		eager: true
	}
);

/**
 * Get list of available chapter numbers for a given language
 * This uses Vite's glob import to discover all chapter files
 */
export async function getAvailableChapters(lang: Language): Promise<number[]> {
	// Select the appropriate glob result based on language
	const chapters = lang === 'ja' ? jaChapters : enChapters;

	const chapterNumbers: number[] = [];

	for (const path in chapters) {
		// Extract chapter number from path like "./ja/0.ts" or "./en/1.ts"
		const match = path.match(/\/(\d+)\.ts$/);
		if (match) {
			const chapterNum = parseInt(match[1], 10);
			if (!isNaN(chapterNum)) {
				chapterNumbers.push(chapterNum);
			}
		}
	}

	return chapterNumbers.sort((a, b) => a - b);
}

/**
 * Get chapter metadata (title only, without loading full content)
 * Useful for index pages
 */
export async function getChapterMetadata(
	lang: Language,
	chapterNumber: number
): Promise<{ title: string } | null> {
	try {
		const chapterModule = await import(`./${lang}/${chapterNumber}.ts`);
		return {
			title: chapterModule.chapter.title
		};
	} catch {
		return null;
	}
}

