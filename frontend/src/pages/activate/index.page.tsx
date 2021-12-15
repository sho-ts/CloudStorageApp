import useLogic from './hook';
import { PageTitle, TextField, Button } from '@/components/atoms';
import { Container } from '@/components/templates';
import Head from 'next/head'
import { withGuestLayout } from '@/components/hoc';

const Activate = () => {
  const { code, setCode, activateUser } = useLogic();

  return (
    <>
      <Head>
        <title>アクティベート</title>
      </Head>
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
    </>
  )
}

export default withGuestLayout(Activate);