import { Layout } from '@/components/templates';
import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { DirType } from '@/types/DirType';
import config from '@/utils/config';
import useSWR from 'swr';
import { auth } from '@/utils/aws';
import { Button } from '@/components/atoms'
import axios from 'axios';

const Directory: NextPage = () => {
  const router = useRouter();

  const { data, error } = useSWR(`${config.api}/directory/all`, async (url: string) => {
    const { token } = await auth.getIdTokenAndUser();

    return axios.get<DirType[]>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => data);
  })

  return (
    <Layout>

    </Layout>
  )
}

export default Directory;