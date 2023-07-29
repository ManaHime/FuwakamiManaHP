import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions } from './$types';

import { getUserByEmail, users } from '$db/users/users';

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
		const authRes = await users.updateOne(
			{
				email: email
			},
			{
				$set: {
					userAuthToken
				}
			}
		);
		if (authRes) {
			cookies.set('session', userAuthToken, {
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});
			throw redirect(302, '/');
		}
	}
};
