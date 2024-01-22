import db from '$db/db';
import type { Credentials } from 'google-auth-library';

export const youtube = db.collection('youtube');

export const getYouTubeByUserId = async (userId: string) => {
	return await youtube.findOne({
		userId
	});
};

export const getYouTubeExists = async (userId: string) => {
	try {
		const youtubeUser = await youtube.findOne(
			{
				userId
			},
			{
				projection: {
					id_: 0
				}
			}
		);
		if (youtubeUser) return true;
		return false;
	} catch (err) {
		console.error(err);
		return false;
	}
};

const updateYouTubeToken = async (userId: string, tokens: Credentials) => {
	try {
		await youtube.updateOne(
			{ userId },
			{
				$set: {
					tokens: tokens
				}
			}
		);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const setStreamUserData = async (userId: string, tokens: Credentials, streamData: any) => {
	const res = await youtube.insertOne({
		userId,
		tokens,
		streamData
	});
	return res;
};

export const saveYouTubeToken = async (userId: string, tokens: Credentials) => {
	const isYoutubeLinked = await getYouTubeExists(userId);
	if (isYoutubeLinked) {
		await updateYouTubeToken(userId, tokens);
		return true;
	}
};

export const getAllStream = async () => {
	try {
		return await youtube.find({}, { projection: { _id: 0, streamData: 1 } }).toArray();
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const getAllStreamByUserId = async (userId: string) => {
	try {
		return await youtube.find({ userId }, { projection: { _id: 0, streamData: 1 } }).toArray();
	} catch (err) {
		console.error(err);
		return null;
	}
};
