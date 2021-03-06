import axios from 'axios';
import { IPost, IResponse } from '../types/otagifs';

export default class OtagifsService {
    private readonly BASE_URL = "https://otagifs.com/api/"
    
    public async getRecentPosts(): Promise<IResponse> {
        const { data } = await axios.get(`${this.BASE_URL}posts/recent`)
        return data
    }

    public async getLatestPost(): Promise<IPost|null> {
        const {entries} = await this.getRecentPosts()
        if (entries.length) {
            return entries[0]
        }
        return null
    }

    public async getLatestCleanPost(): Promise<IPost|null> {
        const {entries} = await this.getRecentPosts()
        const clean = entries.filter((it: IPost) => !it.nsfw && !it.private && !it.title.toLowerCase().includes("finger spin"))
        if (clean.length) {
            return clean[0]
        }
        return null
    }

    public getGifFromPost(id: string): string {
        return `https://cdn.otagifs.com/uploads/posts/${id}/video_gif.gif`
    }
}