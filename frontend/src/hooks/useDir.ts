import type { DirType } from '@/types/DirType';
import useSWR from 'swr';
import axios from 'axios'
import { auth } from '@/utils/aws';
import { config } from '@/utils';

const useDir = () => useSWR(`${config.api}/directory/all`, async (url: string) => {
  await auth.getUser();
  const token = auth.getIdToken();

  return axios.get<DirType[]>(url, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(({ data }) => {
    return data
  });
})

export default useDir;