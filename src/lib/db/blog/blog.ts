import db from '$db/db';
import { ObjectId } from 'mongodb';

const blogPosts = db.collection('blogposts');

export const deleteBlogPostById = async (blogPost: string, authorId: string) => {
	try {
		const postId = new ObjectId(blogPost);
		await blogPosts.deleteOne({
			_id: postId,
			authorId
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
