import { useState } from 'react';
import { useDispatch, useSelector } from '@/hooks';
import type { NextPage } from 'next'
import { auth } from '@/utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setSignInState } from '@/stores/user';
import config from '@/utils/config';

import Link from 'next/link';
import { Layout } from '@/components/templates';
import { PageTitle } from '@/components/atoms';
import { Button, Input, Box } from '@chakra-ui/react';

export async function getServerSideProps() {
  const res = await fetch(`${config.api}/posts`);
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const signUp = async () => {
    if (!email || !password) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      if (user) {
        dispatch(setSignInState({
          uid: user.uid,
          email,
          isSignIn: true
        }))
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <PageTitle>仮ページ</PageTitle>
      <Box mb={5}>
        <h1>ログイン状態</h1>
        {user.email && <p>{user.email}</p>}
        <p>{user.isSignIn ? 'sign in' : 'sign out'}</p>
      </Box>
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
      <Box>
        <h2>各ページリンク</h2>
        <Box>
          <Button>
            <Link href="mypage">マイページ</Link>
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
