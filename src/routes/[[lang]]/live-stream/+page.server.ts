import { getAllStream } from '$db/youtube/youtube.js';

export const load = async () => {
	const res = await getAllStream();
	const streamData = res[0].streamData.items;
	return { streamData };
};
