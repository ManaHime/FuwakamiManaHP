import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { getYouTubeByUserId, saveYouTubeToken, setStreamUserData } from '$db/youtube/youtube';

// initialize the Youtube API library
const youtube = google.youtube('v3');

const oauth2Client = new OAuth2Client({
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: GOOGLE_REDIRECT_URI
});

export const getYouTubeURL = async () => {
	const url = oauth2Client.generateAuthUrl({
		// 'online' (default) or 'offline' (gets refresh_token)
		access_type: 'offline',

		// If you only need one scope you can pass it as a string
		scope: 'https://www.googleapis.com/auth/youtube.readonly'
	});
	return url;
};

export const initUserStreamList = async (userId: string, code: string) => {
	try {
		const youtubeUser = await getYouTubeByUserId(userId);
		if (youtubeUser) return false;
		const { tokens } = await oauth2Client.getToken(code);
		if (!tokens) return false;
		await saveYouTubeToken(userId, tokens);
		oauth2Client.setCredentials(tokens);
		google.options({ auth: oauth2Client });
		const streamData = await fetchYTLiveStreamData();
		if (!streamData) return false;
		const res = await setStreamUserData(userId, tokens, streamData);
		if (!res) return false;
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const authToYouTube = async (userId: string, code?: string) => {
	try {
		let auth;
		const youtubeUser = await getYouTubeByUserId(userId);
		if (!code && youtubeUser) {
			const tokens = youtubeUser.tokens;
			oauth2Client.setCredentials(tokens);
			auth = await oauth2Client.refreshAccessToken();
		}
		return auth;
	} catch (error) {
		console.error(error);
	}
};

const fetchYTLiveStreamData = async () => {
	try {
		google.options({ auth: oauth2Client });
		const res = await youtube.liveBroadcasts.list({
			part: ['snippet', 'contentDetails', 'status'],
			broadcastStatus: 'upcoming',
			broadcastType: 'event'
		});
		return res.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};
