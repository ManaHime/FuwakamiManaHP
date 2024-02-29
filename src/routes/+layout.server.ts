import type { LayoutServerLoad } from './$types';
import { NavTranslation } from '$lib/translation/translation';
import { getPreferredLanguage } from '$lib/translation/language';

type Language = keyof typeof NavTranslation;

export const load: LayoutServerLoad = async ({ locals, params, request }) => {
    const lang: Language = (params.lang as Language) || getPreferredLanguage(request.headers.get('accept-language')) || 'en';
    return {
        user: locals.user,
        translation: NavTranslation[lang],
    };
};

