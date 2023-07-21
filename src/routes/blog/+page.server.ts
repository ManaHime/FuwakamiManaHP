import { blogPosts } from "$db/collections";


export async function load() {
    const res = await blogPosts.find().toArray()
    const posts = res.map((item) => JSON.parse(JSON.stringify(item, (key,value) => 
        key === '_id' ? value.toString(value) : value)))
    return { posts }
}