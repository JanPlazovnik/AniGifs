import axios from 'axios';
export default class WebhookService {
    private webhookURL: string|null = null

    constructor() {
        const url = process.env.DISCORD_WEBHOOK
        if (url) {
            this.webhookURL = url
        }
    }

    public async sendWebhookMessage(url: string): Promise<void> {
        if (this.webhookURL == null) {
            console.log("Skipping Discord webhook action.")
            return
        }
        await axios.post(this.webhookURL, {
            content: null,
            embeds: [
                {
                    title: "Posted a new activity!",
                    url: "https://anilist.co/user/relevantcroissant/",
                    color: 7470976,
                    image: { url }
                }
            ]
        })
    }
}