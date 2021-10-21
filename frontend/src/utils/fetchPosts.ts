import config from '@/utils/config'

type fetchPostsTargetType = 'all' | number;

const fetchPosts = async <T>(target?: fetchPostsTargetType): Promise<T | void> => {
  const fetchPath = typeof target === 'number' ? `?id=${target}` : `all`;

  try {
    const res = await fetch(`${config.api}/post/${fetchPath}`, {
      method: 'GET'
    });

    if (!res.ok) throw new Error('投稿の取得に失敗しました');

    const posts = await res.json() as T;

    return posts;
  } catch (e) {
    return;
  }
}

export default fetchPosts;