import { useMemo } from 'react';
import { useSelector } from '@/hooks';
import { PLAN_TYPE } from '@/utils/const';
import { withUserLayoutIgnoreMainLayout } from '@layout';
import { PageTitle, SubTitle, TextField, TextLink, Button } from '@/components/common/atoms';
import { Box } from '@/components/common/molecules';
import { Container } from '@/components/common/templates';
import Head from 'next/head'

const Setting = () => {
  const user = useSelector(state => state.user);
  const userDatas = useMemo(() => {
    return [
      { heading: 'ユーザー名', value: user.name },
      { heading: 'メールアドレス', value: user.email },
      {
        heading: '現在のプラン',
        value: (() => {
          switch (user.plan) {
            case PLAN_TYPE.FREE:
              return '無料';
            case PLAN_TYPE.PREMIUM:
              return 'プレミアム';
            default:
              return '無料'
          }
        })()
      },
      { heading: 'ストレージ', value: user.storage }
    ]
  }, [user])

  return (
    <>
      <Head>
        <title>会員情報</title>
      </Head>
      <Container size="md">
        <PageTitle>会員情報</PageTitle>
        <dl>
          {userDatas.map(({heading, value}) => (
            <Box key={heading}>
              <SubTitle as="dt">{heading}</SubTitle>
              <dd>{value}</dd>
            </Box>
          ))}
        </dl>
      </Container>
    </>
  )
}

export default withUserLayoutIgnoreMainLayout(Setting);