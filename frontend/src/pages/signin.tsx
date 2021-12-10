import { useSignIn } from '@/hooks';
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { TextField, TextLink, Button } from '@/components/atoms';
import {  Container } from '@/components/templates';
import Link from 'next/link';
import { getGuestLayout } from '@/utils/getLayout';

const SignIn = () => {
  const { email, password, setEmail, setPassword, signIn } = useSignIn();

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <Container size="sm">
        <PageTitle>ログイン</PageTitle>
        <div style={{ marginBottom: 16 }}>
          <TextField
            placeholder="メールアドレス"
            type="text" value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            placeholder="パスワード"
            type="password" value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
          />
        </div>
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Button onClick={signIn}>確認</Button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Link href="/signup" passHref>
            <TextLink>新規登録はこちら</TextLink>
          </Link>
        </div>
      </Container>
    </>
  )
}

SignIn.getLayout = getGuestLayout;

export default SignIn;