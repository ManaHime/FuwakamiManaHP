import type { Action } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllUsers } from '$db/users/users'; 
import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
import type { TableSource } from '@skeletonlabs/skeleton';

export const load: PageServerLoad = async () => {
    const res = await getAllUsers()
    const userList = res?.userList
    
    const userTable: TableSource = {
        head: ['User id', 'Username', 'Email', 'role'],
        body: tableMapperValues(userList, ['_id', 'username', 'email', 'role']),
    }
    return {userTable}
}


