import useLogic from './hook';
import { TextField, TextLink, Button, PageTitle } from '@/components/common/atoms';
import { Box } from '@/components/common/molecules';
import { Container } from '@/components/common/templates';
import Link from 'next/link';
import Head from 'next/head'
import { withGuestLayout } from '@layout';

const SignIn = () => {
  const { name, email, password, setName, setEmail, setPassword, signUp, guestSignIn } = useLogic();

  return (
    <Container size="sm">
      <PageTitle>新規登録</PageTitle>
      <Box>
        <TextField
          placeholder="ニックネーム"
          type="text" value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
        />
      </Box>
      <Box>
        <TextField
          placeholder="メールアドレス"
          type="text" value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
        />
      </Box>
      <Box>
        <TextField
          placeholder="パスワード"
          type="password" value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
        />
      </Box>
      <Box align="center">
        <Button onClick={signUp}>確認</Button>
      </Box>
      <Box align="right">
        <TextLink href="/signin">ログインはこちら</TextLink>
      </Box>
      <div style={{ borderBottom: '1px solid #ddd', margin: '32px 0' }} />
      <Box align="center">
        <Button onClick={guestSignIn}>ゲストログイン</Button>
      </Box>
    </Container>
  )
}



export default withGuestLayout(SignIn, '新規登録');