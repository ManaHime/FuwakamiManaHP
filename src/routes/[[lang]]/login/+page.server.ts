import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';
import { LoginTranslation } from '$lib/translation/translation';
import { getPreferredLanguage } from '$lib/translation/language';

import { addUserAuthToken, getUserByEmail } from '$db/users/users';

type Language = keyof typeof LoginTranslation;

export const load = async ({ params, request }) => {
	const lang: Language = (params.lang as Language) || getPreferredLanguage(request.headers.get('accept-language')) || 'en';
	return {
        translation: LoginTranslation[lang],
    };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
			return fail(400, { invalid: true });
		}
		const user = await getUserByEmail(email);

		if (!user) {
			return fail(400, { credentials: true });
		}

		const userPassword = await bcrypt.compare(password, user.password);
		if (!userPassword) {
			return fail(400, { credentials: true });
		}
		const userAuthToken = crypto.randomUUID();
		const authSuccess = await addUserAuthToken(user._id.toString(), userAuthToken);
		if (authSuccess) {
			cookies.set('session', userAuthToken, {
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});
			return redirect(302, '/');
		}
	}
};
