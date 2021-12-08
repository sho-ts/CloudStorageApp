import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { Layout, Container } from '@/components/templates';
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
      <Container size="sm">
        <PageTitle>ログアウト</PageTitle>
        <p style={{ marginBottom: 16 }}>ログアウトする場合はこちらのボタンを押してください</p>
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Button onClick={onClickSignout}>ログアウト</Button>
        </div>
      </Container>
    </Layout>
  )
}

export default SignOut;