import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private"

const client = new MongoClient(DB_URI)

export function start_mongo() {
    console.log('M: Starting Mongo DB')
    return client.connect()
}

export default client.db()