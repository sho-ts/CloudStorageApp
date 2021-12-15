import useLogic from './hook';
import { PageTitle, Button } from '@/components/atoms';
import { Container } from '@/components/templates';
import Head from 'next/head'
import { getUserLayout } from '@/utils/getLayout';

const SignOut = () => {
  const { onClickSignout } = useLogic();

  return (
    <>
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
    </>
  )
}

SignOut.getLayout = getUserLayout.ignoreMainLayout;

export default SignOut;