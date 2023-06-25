import axios from "axios";
import { IOtaGifsPost, IOtaGifsResponse } from "../types/otagifs";

export default class OtagifsService {
  private readonly BASE_URL = "https://otagifs.com/api/";

  public async getRecentPosts(): Promise<IOtaGifsResponse> {
    const { data } = await axios.get(`${this.BASE_URL}posts/recent`);
    return data;
  }

  public async getLatestPost(): Promise<IOtaGifsPost | null> {
    const { entries } = await this.getRecentPosts();
    if (entries.length) {
      return entries[0];
    }
    return null;
  }

  public async getLatestCleanPost(): Promise<IOtaGifsPost | null> {
    const { entries } = await this.getRecentPosts();

    const post = entries
      .filter(
        (it: IOtaGifsPost) =>
          !it.nsfw &&
          !it.private &&
          !it.title.toLowerCase().includes("finger spin")
      )
      .shift();

    if (post) {
      post.id = `otagifs_${post.id}`;
      post.url = this.getGifFromPost(post.id.split("_")[1]);
      return post;
    }

    return null;
  }

  public getGifFromPost(id: string): string {
    return `https://cdn.otagifs.com/uploads/posts/${id}/video_gif.gif`;
  }
}
