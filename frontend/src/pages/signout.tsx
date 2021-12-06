import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { Layout } from '@/components/templates';
import styled from 'styled-components';
import { auth } from '@/utils/aws';
import { useRouter } from 'next/router';

const SignOut: NextPage = () => {
  const router = useRouter();

  const onClickSignout = async () => {
    try {
      const ok = await auth.signout();

      ok && router.push('/');
    } catch (e) {
      alert('ログアウトに失敗しました。\n再度お試しください。')
    }
  }

  return (
    <Layout>
      <Head>
        <title>ログアウト</title>
      </Head>
      <Inner>
        <PageTitle>ログアウト</PageTitle>
        <p style={{ marginBottom: 16 }}>ログアウトする場合はこちらのボタンを押してください</p>
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Button onClick={onClickSignout}>ログアウト</Button>
        </div>
      </Inner>
    </Layout>
  )
}

const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default SignOut;