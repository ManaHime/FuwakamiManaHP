import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { addBlogPost, type BlogPost } from '$db/blog/blog';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const title = data.get('postTitle')?.toString().trim();
		const content = data.get('postBody')?.toString().trim();
		if (!title || !content) {
			return fail(400, { invalid: true });
		}

		const blogPost: BlogPost = {
			title,
			content,
			author: locals.user.name,
			authorId: locals.user.userId,
			date: new Date()
		};
		try {
			await addBlogPost(blogPost);
		} catch (err) {
			console.error(err);
		}
		redirect(303, '/admin');
	}
};
