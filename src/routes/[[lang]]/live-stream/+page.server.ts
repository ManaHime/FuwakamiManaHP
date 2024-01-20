import { getAllStream } from '$db/youtube/youtube.js';

export const load = async () => {
	const res = await getAllStream();
	if (!Array.isArray(res) || res.length === 0 || !res[0].streamData || !res[0].streamData.items) {
		return { streamData: [] };
	}
	const streamData = res[0].streamData.items;
	return { streamData };
};
