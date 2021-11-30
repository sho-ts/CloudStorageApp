import { useSignUp } from '@/hooks';
import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { TextField, TextLink, Button } from '@/components/atoms';
import { Layout } from '@/components/templates';
import Link from 'next/link';
import styled from 'styled-components';


const SignIn: NextPage = () => {
  const { email, password, setEmail, setPassword, signUp } = useSignUp();

  return (
    <Layout isGuest={true}>
      <Head>
        <title>新規登録</title>
      </Head>
      <Inner>
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
            type="text" value={password}
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
      </Inner>
    </Layout>
  )
}

const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default SignIn;