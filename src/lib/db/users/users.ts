import db from '$lib/db/db';
import { ObjectId } from 'mongodb';

export const userCollection = db.collection('users');
const userAuthTokens = db.collection('userAuthTokens');

export const getUserByEmail = async (email: string) => {
	return await userCollection.findOne({ email });
};

export const getUserBySession = async (userAuthToken: string) => {
	const tokenDoc = await userAuthTokens.findOne({ token: userAuthToken });
	if (!tokenDoc) return null;
	return await userCollection.findOne(
		{
			_id: tokenDoc.userId
		},
		{
			projection: { password: 0 }
		}
	);
};

export const getUserId = async (userToken: string) => {
	const userId = await userCollection.findOne(
		{ userAuthTokens: { $in: [userToken] } },
		{ projection: { _id: 1 } }
	);
	if (userId) return userId._id.toString();
	return null;
};

export const getAllUsers = async () => {
	try {
		const res = await userCollection
			.find({}, { projection: { password: 0, userAuthToken: 0 } })
			.toArray();
		const userList = res.map(({ _id, username, email, role, avatar }) => ({
			_id: _id.toString(),
			username,
			email,
			role,
			avatar
		}));
		return { response: 'ok', userList };
	} catch (err) {
		console.error(err);
		return { response: 'error' };
	}
};

export const getUserExists = async (userAuthToken: string) => {
	try {
		// Check if the token exists in the userAuthTokens collection
		const tokenDoc = await userAuthTokens.findOne({ token: userAuthToken });
		return !!tokenDoc; // !! converts to boolean
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const adminEditUser = async (
	userId: string,
	username: string,
	email: string,
	role: string,
	avatar: string
) => {
	try {
		const parsedId = new ObjectId(userId);
		const result = await userCollection.updateOne(
			{ _id: parsedId },
			{
				$set: {
					username,
					email,
					role,
					avatar
				}
			}
		);
		return result.modifiedCount === 1;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const addUserAuthToken = async (userId: string, token: string) => {
	try {
		const now = new Date();
		const result = await userAuthTokens.insertOne({
			userId: new ObjectId(userId),
			token: token,
			createdAt: now
		});
		return result.acknowledged;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const removeUserAuthToken = async (userId: string, token: string) => {
	try {
		const result = await userAuthTokens.deleteOne({
			userId: new ObjectId(userId),
			token: token
		});
		return result.deletedCount === 1;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const addUser = async (username: string, email: string, password: string) => {
	await userCollection.insertOne({
		username,
		email,
		password,
		role: 'user',
		avatar: ''
	});
};
