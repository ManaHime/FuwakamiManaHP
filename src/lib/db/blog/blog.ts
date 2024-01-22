import db from '$db/db';
import { ObjectId } from 'mongodb';

export const BlogPosts = db.collection('blogposts');

export interface BlogPost {
	author: string;
	authorId: string;
	date?: Date;
	title: string;
	content: string;
}

export const addBlogPost = async (blogPost: BlogPost) => {
	await BlogPosts.insertOne(blogPost);
};

export const deleteBlogPostById = async (blogPost: string, authorId: string) => {
	try {
		const postId = new ObjectId(blogPost);
		await BlogPosts.deleteOne({
			_id: postId,
			authorId
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
