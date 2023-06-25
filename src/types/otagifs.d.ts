export interface IUser {
  bot: boolean;
  id: number;
  name: string;
  private: boolean;
}

export interface IFile {
  data?: {
    color?: string;
    height: number;
    size: number;
    width: number;
  };
  name: string;
  type: string;
  version: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IPost {
  files: IFile[];
  id: string;
  inserted_at: string;
  nsfw: boolean;
  private: boolean;
  reddit_source: any[];
  source_url: any[];
  tags: ITag[];
  title: string;
  user: IUser;
}

export interface IResponse {
  entries: IPost[];
  pagination: {
    after?: string;
    before?: string;
    limit: number;
    total_count?: number;
    type: string;
  };
}
