import type { Load } from '@sveltejs/kit';
import { translation } from '$lib/translation/translation';

// get `locals.user` and pass it to the `page` store
export const load: Load = async ({ params }) => {
	const lang = params.lang ?? 'ja';
	if (lang === 'ja') {
		return {
			translation: translation.home.ja
		};
	}
	return {
		translation: translation.home.en
	};
};
