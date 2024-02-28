import db from '$db/db';
import { ObjectId } from 'mongodb';

export interface User {
	_id: string;
	username: string;
	email: string;
	role: 'admin' | 'user';
}

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
		const res = await userCollection.find({}, { projection: { password: 0, userAuthToken: 0 } }).toArray();
		const userList = res.map(({ _id, username, email, role }) => ({
			_id: _id.toString(),
			username,
			email,
			role
		}));
		return { response: 'ok', userList };
	} catch (err) {
		console.error(err);
		return { response: 'error' };
	}
};

export const getUserExists = async (userAuthToken: string) => {
	try {
		const user = await userCollection.findOne(
			{ userAuthTokens: { $in: [userAuthToken] } },
			{ projection: { _id: 1 } }
		);
		return !!user; // !! converts to boolean ( ! makes it false if exist and ! reverses it to true)
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const adminEditUser = async (
	userId: string,
	username: string,
	email: string,
	role: string
) => {
	try {
		const parsedId = new ObjectId(userId);
		const result = await userCollection.updateOne(
			{ _id: parsedId },
			{
				$set: {
					username,
					email,
					role
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
