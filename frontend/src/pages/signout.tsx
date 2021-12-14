import { useRouter } from 'next/router';
import { useDispatch, useFlash } from '@/hooks';
import { PageTitle, Button } from '@/components/atoms';
import { Container } from '@/components/templates';
import { signOut } from '@/stores/user/asyncThunk';
import { MESSAGE_TYPE } from '@/utils/const'
import Head from 'next/head'
import { getUserLayout } from '@/utils/getLayout';

const SignOut = () => {
  const router = useRouter();
  const flash = useFlash();
  const dispatch = useDispatch();

  const onClickSignout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      router.push('/');
    } catch (e) {
      flash({
        message: (e as { errorMessage: string }).errorMessage,
        type: MESSAGE_TYPE.ERROR
      })
    }
  }

  return (
    <>
      <Head>
        <title>ログアウト</title>
      </Head>
      <Container size="sm">
        <PageTitle>ログアウト</PageTitle>
        <p style={{ marginBottom: 16 }}>ログアウトする場合はこちらのボタンを押してください</p>
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Button onClick={onClickSignout}>ログアウト</Button>
        </div>
      </Container>
    </>
  )
}

SignOut.getLayout = getUserLayout.ignoreMainLayout;

export default SignOut;