import useLogic from './hook';
import { PageTitle, TextField, Button } from '@/components/common/atoms';
import { Container } from '@/components/common/templates';
import Head from 'next/head'
import { withGuestLayout } from '@layout';

const Activate = () => {
  const { code, setCode, activateUser } = useLogic();

  return (
    <Container size="sm">
      <PageTitle>アクティベート</PageTitle>
      <p style={{ marginBottom: 16 }}>ご登録されたメールアドレスに認証コードを送信しました。</p>
      <div style={{ marginBottom: 16 }}>
        <TextField
          placeholder="認証コード"
          type="text" value={code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCode(e.target.value) }}
        />
      </div>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Button onClick={activateUser}>確認</Button>
      </div>
    </Container>
  )
}

export default withGuestLayout(Activate, 'アクティベート');