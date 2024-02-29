import type { LayoutServerLoad } from './$types';
import { NavTranslation } from '$lib/translation/translation';

type Language = keyof typeof NavTranslation;

export const load: LayoutServerLoad = async ({ locals, params, request }) => {
    // Ensure lang is recognized as a Language type right from the start
    let lang: Language = params.lang as Language || getPreferredLanguage(request.headers.get('accept-language')) || 'en';

    // Now TypeScript knows lang is a safe key to use for indexing NavTranslation
    return {
        user: locals.user,
        translation: NavTranslation[lang], // TypeScript is now happy :)
    };
};

const parseAcceptLanguage = (header: string | null): Language[] => {
    if (!header) return [];
    return header.split(',')
        .map(lang => lang.split(';')[0].trim() as Language)
        .filter(lang => lang === 'en' || lang === 'ja'); // TypeScript understands these are the only two possibilities
};

// Adjusted to return Language type directly, simplifying the call in the load function
const getPreferredLanguage = (header: string | null): Language | null => {
    if (!header) return null;
    if (header.includes('ja')) return 'ja';
    if (header.includes('en')) return 'en';
    return null;
};
