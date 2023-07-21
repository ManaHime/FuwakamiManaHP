import type { PageServerLoad } from './$types';
import { getAllUsers } from '$db/users/users'; 
import { tableMapperValues } from '@skeletonlabs/skeleton';
import type { TableSource } from '@skeletonlabs/skeleton';

export const load: PageServerLoad = async () => {
    const res = await getAllUsers()
    if(res?.response !== "error"){
        const userList = res.userList
        console.log(userList)
        console.log(res.userList)
        const userTable: TableSource = {
            head: ['User id', 'Username', 'Email', 'role'],
            body: tableMapperValues(userList, ['_id', 'username', 'email', 'role']),
        }
        return {userTable}
    }
}


