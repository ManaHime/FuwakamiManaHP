import type { PageServerLoad } from './$types';
import type { Language } from '$lib/story/chapters/types';
import { getPreferredLanguage } from '$lib/translation/language';
import { getAvailableChapters, getChapterMetadata } from '$lib/story/chapters/index';

export const load: PageServerLoad = async ({ params, request }) => {
	// Get language from params or fallback to preferred language
	const lang: Language =
		(params.lang as Language) ||
		(getPreferredLanguage(request.headers.get('accept-language')) as Language) ||
		'en';

	// Get all available chapters
	const chapterNumbers = await getAvailableChapters(lang);

	// Get metadata for each chapter
	const chapters = await Promise.all(
		chapterNumbers.map(async (num) => {
			const metadata = await getChapterMetadata(lang, num);
			return {
				number: num,
				title: metadata?.title || `Chapter ${num}`,
				url: `/${lang}/story/${num}`
			};
		})
	);

	return {
		lang,
		chapters,
		title: '異世界で空を知らない姫ですが、生きるために、魔法を使います',
		titleEn: 'The Princess Who Doesn\'t Know the Sky in Another World, But Uses Magic to Survive'
	};
};

