import { BlogPosts } from '$db/blog/blog';

export async function load() {
	const res = await BlogPosts.find().toArray();
	const posts = res.map((item) =>
		JSON.parse(
			JSON.stringify(item, (key, value) => (key === '_id' ? value.toString(value) : value))
		)
	);
	return { posts };
}
