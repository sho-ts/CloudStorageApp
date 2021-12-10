import { useSignUp } from '@/hooks';
import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { TextField, TextLink, Button } from '@/components/atoms';
import { GuestLayout, Container } from '@/components/templates';
import Link from 'next/link';
import type { ReactElement } from 'react'

const SignIn = () => {
  const { email, password, setEmail, setPassword, signUp } = useSignUp();

  return (
    <>
      <Head>
        <title>新規登録</title>
      </Head>
      <Container size="sm">
        <PageTitle>新規登録</PageTitle>
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
          <Button onClick={signUp}>確認</Button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Link href="/signin" passHref>
            <TextLink>ログインはこちら</TextLink>
          </Link>
        </div>
      </Container>
    </>
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return (
    <GuestLayout>
      {page}
    </GuestLayout>
  )
}

export default SignIn;