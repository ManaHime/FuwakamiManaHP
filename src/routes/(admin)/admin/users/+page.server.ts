import type { PageServerLoad, Actions } from './$types';
import { adminEditUser, getAllUsers } from '$db/users/users';
import { tableMapperValues } from '@skeletonlabs/skeleton';
import type { TableSource } from '@skeletonlabs/skeleton';

export const load: PageServerLoad = async () => {
	const res = await getAllUsers();
	if (res?.response !== 'error' && res?.userList) {
		const userList = res.userList;
		const userTable: TableSource = {
			head: ['User id', 'Username', 'Email', 'role', 'avatar'],
			body: tableMapperValues(userList, ['_id', 'username', 'email', 'role', 'avatar'])
		};
		return { userTable };
	}
};

export const actions: Actions = {
	default: async (req) => {
		const data = await req.request.formData();
		const userId = data.get('userId')?.toString();
		const username = data.get('username')?.toString();
		const email = data.get('email')?.toString();
		const role = data.get('role')?.toString();
		const avatar = data.get('avatar')?.toString() ?? '';
		if (userId && username && email && role) {
			await adminEditUser(userId, username, email, role, avatar);
		}
	}
};
