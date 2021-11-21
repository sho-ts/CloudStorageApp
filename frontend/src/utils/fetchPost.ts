import config from '@/utils/config'
import { auth } from '@/utils/aws';

const fetchPost = async <T>(id: number) => {
  try {
    const user = await auth.getUser();
    const token = auth.getIdToken();

    if(!user || !token) return;

    const res = await fetch(`${config.api}/post/?id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('投稿の取得に失敗しました');

    const post = await res.json() as T;

    return post;
  } catch (e) {
    return;
  }
}

export default fetchPost;