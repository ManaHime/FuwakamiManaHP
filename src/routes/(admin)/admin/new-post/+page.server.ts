import { blogPosts } from '$db/collections';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const title = data.get('postTitle');
		const content = data.get('postBody');
		const author = locals.user.name;
		const authorId = locals.user.userId;
		if (typeof title !== 'string' || typeof content !== 'string' || !title || !content) {
			return fail(400, { invalid: true });
		}

		await blogPosts.insertOne({
			author,
			authorId,
			date: new Date(),
			title,
			content
		});
		throw redirect(303, '/admin');
	}
};
