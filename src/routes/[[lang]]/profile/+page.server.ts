import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
    const user = locals.user;
    if (user) {
        return {
            user: {
                name: user.name,
                avatar: user.avatar,
            }
        }
    }
}

