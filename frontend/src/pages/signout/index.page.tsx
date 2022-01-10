import useLogic from './hook';
import { PageTitle, Button } from '@/components/common/atoms';
import { Container } from '@/components/common/templates';
import Head from 'next/head'
import { withUserLayoutIgnoreMainLayout } from '@layout';

const SignOut = () => {
  const { onClickSignout } = useLogic();

  return (
    <Container size="sm">
      <PageTitle>ログアウト</PageTitle>
      <p style={{ marginBottom: 16 }}>ログアウトする場合はこちらのボタンを押してください</p>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Button onClick={onClickSignout}>ログアウト</Button>
      </div>
    </Container>
  )
}

export default withUserLayoutIgnoreMainLayout(SignOut, 'ログアウト');