import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Language, Chapter } from '$lib/story/chapters/types';
import { getPreferredLanguage } from '$lib/translation/language';
import { getAvailableChapters } from '$lib/story/chapters/index';

export const load: PageServerLoad = async ({ params, request }) => {
	// Get language from params or fallback to preferred language
	const lang: Language =
		(params.lang as Language) ||
		(getPreferredLanguage(request.headers.get('accept-language')) as Language) ||
		'en';

	// Get chapter number from params
	const chapterParam = params.chapter;
	
	// Parse chapter number - "0" displays the prologue
	const chapterNumber = parseInt(chapterParam, 10);
	if (isNaN(chapterNumber) || chapterNumber < 0) {
		error(404, 'Chapter not found');
	}

	// Dynamically import the chapter file
	let chapterData: Chapter;
	try {
		const chapterModule = await import(
			`$lib/story/chapters/${lang}/${chapterNumber}.ts`
		);
		chapterData = chapterModule.chapter;
	} catch (err) {
		// Chapter file doesn't exist
		error(404, 'Chapter not found');
	}

	// Get available chapters for navigation
	const availableChapters = await getAvailableChapters(lang);
	const sortedChapters = availableChapters.sort((a, b) => a - b);
	
	// Find next and previous chapter numbers
	const currentIndex = sortedChapters.indexOf(chapterNumber);
	const prevChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null;
	const nextChapter = currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null;

	return {
		chapter: chapterData,
		chapterNumber,
		lang,
		prevChapter: prevChapter !== null ? { number: prevChapter, url: `/${lang}/story/${prevChapter}` } : null,
		nextChapter: nextChapter !== null ? { number: nextChapter, url: `/${lang}/story/${nextChapter}` } : null,
		indexUrl: `/${lang}/story`,
		title: '異世界で空を知らない姫ですが、生きるために、魔法を使います',
		titleEn: 'The Princess Who Doesn\'t Know the Sky in Another World, But Uses Magic to Survive'
	};
};
