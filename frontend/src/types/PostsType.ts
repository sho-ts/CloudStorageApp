import { ApiPostType } from '@common/types/ApiPostType';

export type PostsType = {
  posts: ApiPostType[],
  pages: number,
  current: number,
}