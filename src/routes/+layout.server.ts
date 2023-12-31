import type { LayoutServerLoad } from './$types';
import { translation } from '$lib/translation/translation';

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals, params }) => {
	const lang = params.lang ?? 'ja';
	if (lang === 'ja') {
		return {
			user: locals.user,
			translation: translation.navigation.ja
		};
	}
	return {
		user: locals.user,
		translation: translation.navigation.en
	};
};
