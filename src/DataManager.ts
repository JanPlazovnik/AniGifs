import { ICatResponse } from "./types/cat";
import { IOtaGifsPost } from "./types/otagifs";

type CachedPost = IOtaGifsPost | ICatResponse;

export default class DataManager {
  private postCache: Map<string, CachedPost> = new Map();

  public isPostCached(id: string): boolean {
    return this.postCache.has(id);
  }

  public cachePost(post: CachedPost): void {
    if ("id" in post) {
      this.postCache.set(post.id, post);
    } else if ("_id" in post) {
      this.postCache.set(post._id, post);
    } else {
      throw new Error("Invalid post object.");
    }
  }
}
