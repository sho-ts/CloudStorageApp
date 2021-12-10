import { useRouter } from 'next/router';
import { useDispatch } from '@/hooks';
import { PageTitle, Button } from '@/components/atoms';
import { Container } from '@/components/templates';
import { signOut } from '@/stores/user/asyncThunk';
import Head from 'next/head'
import { getUserLayout } from '@/utils/getLayout';

const SignOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickSignout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      router.push('/');
    } catch (e) {
      alert((e as { errorMessage: string }).errorMessage);
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