import type { ApiDirType } from '@/types/ApiDirType';
import useSWR from 'swr';
import { createAxiosInstance } from '@/utils';

const useDir = () => useSWR(`/directory/all`, async (url: string) => {
  const axiosInstance = await createAxiosInstance();

  return axiosInstance.get<ApiDirType[]>(url).then(({ data }) => data);
})

export default useDir;