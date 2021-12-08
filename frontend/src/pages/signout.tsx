import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { Button } from '@/components/atoms';
import { Layout, Container } from '@/components/templates';
import { useRouter } from 'next/router';
import { signOut } from '@/stores/user/asyncThunk';
import { useDispatch } from '@/hooks';

const SignOut: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickSignout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      router.push('/');
    } catch (e) {
      alert((e as { errorMessage: string }).errorMessage);
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