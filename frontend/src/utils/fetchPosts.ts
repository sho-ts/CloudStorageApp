import config from '@/utils/config'
import { auth } from '@/utils/aws';

type fetchPostsTargetType = 'all' | number;

const fetchPosts = async <T>(target?: fetchPostsTargetType) => {
  const fetchPath = typeof target === 'number' ? `?id=${target}` : `all`;

  try {
    const user = await auth.getUser();
    const token = auth.getIdToken();

    if(!user || !token) return;

    const res = await fetch(`${config.api}/post/${fetchPath}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('投稿の取得に失敗しました');

    const posts = await res.json() as T;

    return posts;
  } catch (e) {
    return;
  }
}

export default fetchPosts;