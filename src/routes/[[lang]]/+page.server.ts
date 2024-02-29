import { HomeTranslation } from '$lib/translation/translation';
import { getPreferredLanguage } from '$lib/translation/language';

type Language = keyof typeof HomeTranslation;

// get `locals.user` and pass it to the `page` store
export const load = async ({ params, request }) => {
    const lang: Language = (params.lang as Language) || getPreferredLanguage(request.headers.get('accept-language')) || 'en';
    return {
        translation: HomeTranslation[lang],
    };
};
