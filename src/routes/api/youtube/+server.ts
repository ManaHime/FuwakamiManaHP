import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { initUserStreamList } from '$lib/youtube/youtube';

export const GET: RequestHandler = async (request) => {
	const user = request.locals?.user;
	const code = request.url.searchParams?.get('code');
	if (user && code) {
		await initUserStreamList(user.userId, code);
	}
	throw redirect(302, '/');
};
