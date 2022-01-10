import useLogic from './hook';
import { PageTitle, TextField, TextLink, Button } from '@/components/common/atoms';
import { Container } from '@/components/common/templates';
import { withGuestLayout } from '@layout';

const SignIn = () => {
  const { email, password, setEmail, setPassword, signIn } = useLogic();

  return (
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
        <TextLink href="/signup">新規登録はこちら</TextLink>
      </div>
    </Container>
  )
}

export default withGuestLayout(SignIn, 'ログイン');