import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFlash } from '@/hooks';
import { auth } from '@/utils/aws';
import styled from 'styled-components';
import { PageTitle, TextField, Button } from '@/components/atoms';
import Head from 'next/head'
import { getGuestLayout } from '@/utils/getLayout';
import { MESSAGE_TYPE } from '@/utils/const'

const Activate = () => {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const flash = useFlash();

  const activateUser = async () => {
    if (!router.query.email || !code) return;

    try {
      const activated = await auth.activate(`${router.query.email}`, code);

      if (activated) {
        flash({
          message: '認証に成功しました。ログインしてください',
          type: MESSAGE_TYPE.NOTICE
        })
        router.push('/signin');
      }
    } catch (e) {
      flash({
        message: '認証に失敗しました。コードを確認してください',
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return (
    <>
      <Head>
        <title>アクティベート</title>
      </Head>
      <Inner>
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
      </Inner>
    </>
  )
}

Activate.getLayout = getGuestLayout;

const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default Activate;