import { deleteBlogPostById } from '$db/blog/blog.js';
import { getUserExists } from '$db/users/users.js';
import type { Cookies } from '@sveltejs/kit';

export const DELETE = async ({ cookies, request }: { cookies: Cookies; request: Request }) => {
	const session = cookies.get('session');
	if (session) {
		const isAuthedUser = await getUserExists(session);
		const authHeader = request.headers.get('Authorization');

		if (!isAuthedUser || !authHeader) {
			return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
		}

		const post = await request.json();
		const postId: string = post?.postId;

		if (!postId) {
			return new Response(JSON.stringify({ message: 'Non valid request' }), { status: 400 });
		}

		const res = await deleteBlogPostById(postId, authHeader);
		if (res) return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
	}

	return new Response(JSON.stringify({ message: 'Unknown error' }), { status: 400 });
};
