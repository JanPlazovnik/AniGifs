import { IPost } from "./types/otagifs";

export default class DataManager {
  private postCache: Map<string, IPost> = new Map();

  public isPostCached(id: string): boolean {
    return this.postCache.has(id);
  }

  public cachePost(post: IPost): void {
    this.postCache.set(post.id, post);
  }
}
