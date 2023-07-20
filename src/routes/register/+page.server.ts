import { users } from "$db/users/users";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import bcrypt from 'bcrypt'

export const load: PageServerLoad = async function({ locals }){
    if (locals.user){
        throw redirect(302, '/')
    }
}

export const actions: Actions = {
    default: async (req) => {
        const data = await req.request.formData()
        const username = data.get('username')
        const email = data.get('email')
        const rawPassword = data.get('password')
        const confirmPassword = data.get('confirmPassword')

        if (
            typeof username !== 'string' ||
            typeof email !== 'string' ||
            typeof rawPassword !== 'string' ||
            typeof confirmPassword !== 'string' ||
            !username ||
            !email ||
            !rawPassword ||
            !confirmPassword ||
            rawPassword !== confirmPassword
        ){
            return fail(400, { invalid: true})
        }

        const user = await users.findOne({
            email
        })
        if(user) {
            return fail(400, { invalid: true })
        }

        const password = await bcrypt.hash(rawPassword, 10)
        await users.insertOne({
            username,
            email,
            password,
            role: 'user'
        })
        throw redirect(303, '/login')
    }
}