import OtagifsService from './OtagifsService';
import DataManager from '../DataManager';
import WebhookService from './WebhookService';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Anilist = require("anilist-node");

export default class AnilistService {
    private dataManager = new DataManager()
    private otagifs = new OtagifsService()
    private webhook = new WebhookService()
    private anilist: typeof Anilist|null = null
    private auth = false

    constructor() {
        const token = process.env.ANILIST_TOKEN
        if (token) {
            this.auth = true
            this.anilist = new Anilist(token)
            console.log("Using authorized AniList client.")
        } else {
            this.anilist = new Anilist()
            console.warn("Using unauthorized AniList client. Some features will not work.")
        }
    }

    public async addActivity(): Promise<void> {
        try {
            if (!this.auth) {
                console.log("Client is not authorized.")
                return
            }
            const post = await this.otagifs.getLatestCleanPost()
            if (!post) {
                console.log("No posts available.")
                return
            }
            if (this.dataManager.isPostCached(post.id)) {
                console.log("Post was already published.")
                return
            }

            const url = this.otagifs.getGifFromPost(post.id)
            const content = this.prepareMessageContent(url)

            await this.anilist.activity.postText(content)
            await this.webhook.sendWebhookMessage(url)
            console.log(`Successfully posted ${url} @ ${new Date().toUTCString()}`)
            this.dataManager.cachePost(post)
        } catch (e) {
            console.log(`Publishing the activity failed.`)
            console.error(e)
        }
    }
    
    private prepareMessageContent(url: string): string {
        return `~~~img500(${url})~~~`
    }
}