import config from '@/utils/config'
import { auth } from '@/utils/aws';
import { PostType } from '@/types/PostType';

const fetchPosts = async (page = 1) => {
  try {
    const user = await auth.getUser();
    const token = auth.getIdToken();

    if (!user || !token) return;

    const res = await fetch(`${config.api}/post/all/?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  if (!res.ok) throw new Error('投稿の取得に失敗しました');

  const posts = await res.json() as {
    posts: PostType[],
    pages: number,
    current: number,
  };

    return posts;
  } catch (e) {
    return;
  }
}

export default fetchPosts;