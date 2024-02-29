export const getPreferredLanguage = (header: string | null): Language | null => {
    const preferredLanguages = parseAcceptLanguage(header);
    return preferredLanguages.length > 0 ? preferredLanguages[0] : null;
};

type Language = 'en' | 'ja';

const parseAcceptLanguage = (header: string | null): Language[] => {
    if (!header) return [];
    return header.split(',')
        .map(part => {
            const [lang, q] = part.split(';').map(p => p.trim());
            return { lang: lang as Language, q: q ? parseFloat(q.split('=')[1]) : 1 }; // Default quality is 1
        })
        .filter(({ lang }) => lang === 'en' || lang === 'ja')
        .sort((a, b) => b.q - a.q) // Sort by quality, descending
        .map(({ lang }) => lang);
};