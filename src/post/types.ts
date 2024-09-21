import { FetchResult } from "@apollo/client";

export interface ITag {
  title: string;
}

export type TReactionHooks = (postId: string) => Promise<FetchResult<unknown>>
