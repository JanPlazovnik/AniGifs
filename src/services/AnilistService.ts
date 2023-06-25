import OtagifsService from "./OtagifsService";
import DataManager from "../DataManager";
import WebhookService from "./WebhookService";
import CatService from "./CatService";
import { DEV_MODE } from "..";
import { IOtaGifsPost } from "../types/otagifs";
import { ICatResponse } from "../types/cat";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Anilist = require("anilist-node");

export default class AnilistService {
  private dataManager = new DataManager();
  private otagifs = new OtagifsService();
  private cats = new CatService();
  private webhook = new WebhookService();
  private anilist: typeof Anilist | null = null;
  private auth = false;

  constructor() {
    const token = process.env.ANILIST_TOKEN;
    if (token) {
      this.auth = true;
      this.anilist = new Anilist(token);
      console.log("Using authorized AniList client.");
    } else {
      this.anilist = new Anilist();
      console.warn(
        "Using unauthorized AniList client. Some features will not work."
      );
    }
  }

  private postText(text: string): Promise<void> {
    if (!text) {
      console.log("Skipping empty post.");
      return Promise.resolve();
    }

    if (DEV_MODE) {
      console.log(`[DEV] ${text}`);
      return Promise.resolve();
    }

    return this.anilist.activity.postText(text);
  }

  public async addActivity(): Promise<void> {
    try {
      // Nothing can be done without authorization.
      if (!this.auth) {
        console.log("Client is not authorized.");
        return;
      }

      let post: IOtaGifsPost | ICatResponse | null =
        await this.otagifs.getLatestCleanPost();

      // Nesting these if statements is a bit ugly, but it's the easiest way to do it right now :))
      if (!post || this.dataManager.isPostCached(post.id)) {
        post = await this.cats.getRandomCat();

        if (!post || this.dataManager.isPostCached(post.id)) {
          // No post was found, so we'll post a random baked good.
          const bakedGoods = [
            "bread",
            "croissant",
            "baguette",
            "muffin",
            "scone",
            "pastry",
            "donut",
            "pretzel",
            "ciabatta",
            "cinnamon roll",
          ];

          const randomPastry =
            bakedGoods[Math.floor(Math.random() * bakedGoods.length)];

          await this.postText(randomPastry);
          await this.webhook.sendWebhookMessage({ description: randomPastry });

          return;
        }
      }

      const content = this.prepareMessageContent(post.url);

      await this.postText(content);
      await this.webhook.sendWebhookMessage({ url: post.url });

      console.log(
        `Successfully posted ${post.url} @ ${new Date().toUTCString()}`
      );

      this.dataManager.cachePost(post);
    } catch (e) {
      console.log(`Publishing the activity failed.`);
      console.error(e);
      await this.webhook.sendWebhookMessage({
        description: `Publishing the activity failed. (╯°□°）╯︵ ┻━┻`,
      });
    }
  }

  private prepareMessageContent(url: string): string {
    return `~~~img500(${url})~~~`;
  }
}
