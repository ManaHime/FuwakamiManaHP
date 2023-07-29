import { getYouTubeExists } from "$db/youtube/youtube.js"
import { getYouTubeURL } from "$lib/youtube/youtube"

export const load = async (params) => {
    const user = params.locals.user
    if(user){
        const isYouTubeAuthed = await getYouTubeExists(user.userId)
        if(isYouTubeAuthed){
            return {}
        }
    }
    const url = getYouTubeURL()
    return { url }
}