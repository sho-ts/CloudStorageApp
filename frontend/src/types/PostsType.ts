import { PostType } from './PostType';

export type PostsType = {
  posts: PostType[],
  pages: number,
  current: number,
}