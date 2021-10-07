import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout, Protect } from '@/components/templates';

const Datas: NextPage = () => {
  return (
    <Protect>
      <Layout>
        this is datas page
      </Layout>
    </Protect>
  )
}

export default Datas
