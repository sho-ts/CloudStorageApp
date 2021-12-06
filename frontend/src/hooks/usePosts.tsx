import { useState } from 'react';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { config } from '@/utils';
import axios from 'axios'
import { PostType } from '@/types/PostType';
import { createPagination } from '@/utils';
import { useDispatch, useSelector } from '@/hooks';
import { setPostState } from '@/stores/post';

type PostsType = {
  posts: PostType[],
  pages: number,
  current: number,
}

const usePosts = () => {
  const { current, keyword } = useSelector(props => props.post);
  const dispatch = useDispatch();

  const [inputKeyword, setInputKeyword] = useState<string>('');

  const onChangeInputKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
    dispatch(setPostState({
      current: 1,
      keyword: inputKeyword,
    }));
  };

  const dispatchCurrent = (current: number) => {
    dispatch(setPostState({
      current,
    }))
  }

  const { data, error } = useSWR<PostsType>(`${config.api}/post/all?page=${current}&s=${keyword}`, (url: string) => {
    const token = auth.getIdToken();

    return axios.get<PostsType>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      dispatch(setPostState({
        current: data.current
      }))

      return data
    });
  });

  const [getNextDatas, getPrevDatas] = createPagination<PostsType>(current, dispatchCurrent, data);

  return {
    current,
    data,
    error,
    keyword,
    onChangeInputKeyword,
    getNextDatas,
    getPrevDatas,
  }
}

export default usePosts;