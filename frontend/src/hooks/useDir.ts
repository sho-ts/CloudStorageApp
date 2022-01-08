import type { DirType } from '@/types/DirType';
import useSWR from 'swr';
import { createAxiosInstance } from '@/utils';

const useDir = () => useSWR(`/directory/all`, async (url: string) => {
  const axiosInstance = await createAxiosInstance();

  return axiosInstance.get<DirType[]>(url).then(({ data }) => data);
})

export default useDir;