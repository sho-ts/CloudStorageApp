import { useState } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import type { NextPage } from 'next'
import { setSignInState } from '@/stores/user';
import config from '@/utils/config';
import { auth } from '@/utils/aws';
import Link from 'next/link';
import { Layout } from '@/components/templates';
import { PageTitle } from '@/components/atoms';
import { Button, Input, Box } from '@chakra-ui/react';

export async function getServerSideProps() {
  const res = await fetch(`${config.api}/post/all`);
  const json = await res.json();
  return {
    props: { json }
  }
}

type Props = {
  json: {
    id: number,
    message: string,
  }
}

const Home: NextPage<Props> = (props) => {
  const user = useSelector(state => state.user);

  const onClickSignOut = async () => {
    try {
      await auth.signout();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <PageTitle>仮ページ</PageTitle>
      <Box mb={5}>
        <h1>ログイン状態</h1>
        <p>{user.isSignIn ? 'sign in' : 'sign out'}</p>
      </Box>
      <Box>
        <h2>各ページリンク</h2>
        <Box mb={4}>
          <Button w={40}>
            <Link href="mypage">マイページ</Link>
          </Button>
        </Box>
        <Box mb={4}>
          <Button w={40}>
            <Link href="signup">サインアップ</Link>
          </Button>
        </Box>
        <Box>
          <Button w={40} onClick={onClickSignOut}>
            サインアウト
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
