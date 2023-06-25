import { ICatResponse } from "./types/cat";
import { IOtaGifsPost } from "./types/otagifs";

export type CachedPost = IOtaGifsPost | ICatResponse;

export default class DataManager {
  private postCache: Map<string, CachedPost> = new Map([
    ["otagifs_Cn3pei", {} as CachedPost], // Hardcoded to prevent duplicate right off the bat.
  ]);

  public isPostCached(id: string): boolean {
    return this.postCache.has(id);
  }

  public cachePost(post: CachedPost): void {
    if ("id" in post) {
      this.postCache.set(post.id, post);
    } else {
      throw new Error("Invalid post object.");
    }
  }
}
