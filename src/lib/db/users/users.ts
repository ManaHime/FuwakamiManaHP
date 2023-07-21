import db from "$db/db"

export const users = db.collection('users')

export const getUserByEmail = async (email: string) => {
    return await users.findOne({
        email: email
    })
}

export const getUserId = async (userToken: string) => {
    const userId = await users.findOne({userAuthToken: userToken}, {projection: {_id : 1}})
    if (userId){
        return userId._id.toString()
    }
    return null
}

export const getAllUsers = async () => {
    try {
        const res = await users.find( {}, {projection:{ password: 0, userAuthToken: 0 }} ).toArray()
        const userList:{_id: string, username: string, email: string, role: string}[] = res.map((item) => JSON.parse(JSON.stringify(item, (key,value) =>
        key === '_id' ? value.toString(value) : value)))
        return { response: "ok", userList }
    } catch (err) {
        console.error(err)
        return {response: "error"}
    }   
}

export const getUserExists = async (userAuthToken: string) => {
    try {
        const user = await users.findOne({
            userAuthToken
        },{projection: {
            id_: 1
        }})
        if(user) return true
        return false
    } catch (err) {
        console.error(err)
        return false
    }
}