import { getAllStream } from '$db/youtube/youtube.js';

export const load = async (params) => {
    const res = await getAllStream()
    const streamData = res[0].streamData.items
    return { streamData };
}