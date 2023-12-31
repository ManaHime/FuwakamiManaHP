import { deleteBlogPostById } from '$db/blog/blog.js';
import { getUserExists } from '$db/users/users.js';

export const DELETE = async ({ cookies, request }) => {
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

// default: (req) => async {
//     const data = await req.request.formData()
//     const postToDelete = data.get('postToDel')
//     await deleteBlogPostById(postToDelete)
// }

// export const getUserId = async (userToken)
