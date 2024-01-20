import db from '$db/db';
import { ObjectId } from 'mongodb';

export const users = db.collection('users');

export const getUserByEmail = async (email: string) => {
	return await users.findOne({
		email: email
	});
};

export const getUserId = async (userToken: string) => {
	const userId = await users.findOne({ userAuthToken: userToken }, { projection: { _id: 1 } });
	if (userId) return userId._id.toString();
	return null;
};

export const getAllUsers = async () => {
	try {
		const res = await users.find({}, { projection: { password: 0, userAuthToken: 0 } }).toArray();
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
		const user = await users.findOne({ userAuthToken }, { projection: { _id: 1 } });
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
		const result = await users.updateOne(
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
