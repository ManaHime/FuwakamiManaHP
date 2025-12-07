import { start_mongo } from '$lib/db/db';
import type { Handle } from '@sveltejs/kit';
import { getUserBySession } from '$lib/db/users/users';

start_mongo()
	.then(() => {
		console.log('M: Mongo Started');
	})
	.catch((e) => {
		console.error(e);
	});

function redirect(location: string) {
	return new Response(undefined, {
		status: 303,
		headers: { location }
	});
}

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		// if there is no session load page as normal
		if (event.url.pathname.startsWith('/admin')) {
			return redirect('/');
		}
		return await resolve(event);
	}

	// find the user based on the session
	const user = await getUserBySession(session);

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			userId: user._id.toString(),
			name: user.username,
			role: user.role,
			avatar: user.avatar
		};
		if (event.url.pathname.startsWith('/admin') && user.role !== 'admin') {
			return redirect('/');
		}
	}
	// load page as normal
	return await resolve(event);
};
