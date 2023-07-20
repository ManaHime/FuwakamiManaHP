import { blogPosts } from "$db/collections";
import { deleteBlogPostById } from "$db/blog/blog";


export async function load() {
    const res = await blogPosts.find().toArray()
    const posts = res.map((item) => JSON.parse(JSON.stringify(item, (key,value) => 
        key === '_id' ? value.toString(value) : value)))
    return { posts }
}

export const actions = {
    default: async (req) => {
            const data = await req.request.formData()
            const postToDelete = data.get('postToDel')
            await deleteBlogPostById(postToDelete)
    }
}