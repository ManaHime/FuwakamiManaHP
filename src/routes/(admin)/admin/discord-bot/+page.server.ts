import { getAllStreamByUserId, getYouTubeExists } from '$db/youtube/youtube.js';
import { getYouTubeURL } from '$lib/youtube/youtube.server';

export const load = async (params) => {
	const user = params.locals.user;
	if (user) {
		const isYouTubeAuthed = await getYouTubeExists(user.userId);
		if (isYouTubeAuthed) {
			const res = await getAllStreamByUserId(user.userId);
			if (
				!Array.isArray(res) ||
				res.length === 0 ||
				!res[0].streamData ||
				!res[0].streamData.items
			) {
				return { streamData: [] };
			}
			const streamData = res[0].streamData.items;
			return { streamData };
		}
	}
	const url = await getYouTubeURL();
	return { url };
};
