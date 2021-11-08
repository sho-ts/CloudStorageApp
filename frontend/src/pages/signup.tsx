import { useSignUp } from '@/hooks';
import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTitle } from '@/components/atoms';
import { Button, Input, Box } from '@chakra-ui/react';
import { Layout } from '@/components/templates';

type Props = {

}

const SignIn: NextPage<Props> = (props) => {
  const { email, password, setEmail, setPassword, signUp } = useSignUp();

  return (
    <Layout>
      <Head>
        <title>サインイン</title>
      </Head>
      <PageTitle>サインアップ</PageTitle>
      <Box maxW="500px" mb={5}>
        <Box mb={2}>
          <Input
            placeholder="email"
            type="text" value={email}
            onChange={e => { setEmail(e.target.value) }}
          />
        </Box>
        <Box mb={2}>
          <Input
            placeholder="password"
            type="text" value={password}
            onChange={e => { setPassword(e.target.value) }}
          />
        </Box>
        <Button type="button" onClick={signUp}>サインアップ</Button>
      </Box>
    </Layout>
  )
}

export default SignIn;