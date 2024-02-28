import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getUserBySession, removeUserAuthToken } from '$lib/db/users/users';

export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const authToken = cookies.get('session');
		if (!authToken) {
			throw redirect(302, '/login');
		}
		const user = await getUserBySession(authToken);
		if (!user?._id) {
			throw redirect(302, '/login');
		}
		await removeUserAuthToken(user._id.toString(), authToken);
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(302, '/login');
	}
};

