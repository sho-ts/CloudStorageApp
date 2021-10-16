import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '@/components/templates';

type Props = {

}

const SignIn: NextPage<Props> = (props) => {

  return (
    <Layout>
      <Head>
        <title>サインイン</title>
      </Head>
      
    </Layout>
  )
}

export default SignIn;