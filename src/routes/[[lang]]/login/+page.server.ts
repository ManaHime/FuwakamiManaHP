import type { Load } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';
import { LoginTranslation } from '$lib/translation/translation';

import { addUserAuthToken, getUserByEmail, users } from '$db/users/users';
import type { User } from '$db/users/users';

export const load: Load = async ({ params }) => {
	const lang = params.lang ?? 'ja';
	if (lang === 'ja') {
		return {
			translation: LoginTranslation.ja
		};
	}
	return {
		translation: LoginTranslation.en
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
