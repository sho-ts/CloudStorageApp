import { useSignIn } from '@/hooks';
import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { Button, Input, Box, Container, Text } from '@chakra-ui/react';
import { Layout } from '@/components/templates';
import Link from 'next/link';

type Props = {

}

const SignIn: NextPage<Props> = (props) => {
  const { email, password, setEmail, setPassword, signIn } = useSignIn();

  return (
    <Layout>
      <Head>
        <title>ログイン</title>
      </Head>
      <Container maxW="container.sm">
        <PageTitle>ログイン</PageTitle>
        <Box mb={8}>
          <Box mb={6}>
            <Input
              placeholder="メールアドレス"
              type="text" value={email}
              onChange={e => { setEmail(e.target.value) }}
            />
          </Box>
          <Box mb={6}>
            <Input
              placeholder="パスワード"
              type="text" value={password}
              onChange={e => { setPassword(e.target.value) }}
            />
          </Box>
          <Box textAlign="center">
            <Button type="button" onClick={signIn} px="8">確認</Button>
          </Box>
        </Box>
        <Text align="right" color="blue.700">
          <Link href="/signup">
            <a>
              新規登録はこちら
            </a>
          </Link>
        </Text>
      </Container>
    </Layout>
  )
}

export default SignIn;