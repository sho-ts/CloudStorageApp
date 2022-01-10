import useLogic from './hook';
import { withUserLayoutIgnoreMainLayout } from '@layout';
import { PageTitle, SubTitle, Button } from '@/components/common/atoms';
import { Box } from '@/components/common/molecules';
import { Container } from '@/components/common/templates';
import Link from 'next/link'

const Setting = () => {
  const [userDatas] = useLogic();

  return (
    <Container size="md">
      <PageTitle>会員情報</PageTitle>
      <Box>
        <dl>
          {userDatas.map(({ heading, value }) => (
            <Box key={heading}>
              <SubTitle as="dt">{heading}</SubTitle>
              <dd>{value}</dd>
            </Box>
          ))}
        </dl>
      </Box>
      <Box align="center">
        <Link href="/setting/edit">
          <a>
            <Button as="div">編集</Button>
          </a>
        </Link>
      </Box>
    </Container>
  )
}

export default withUserLayoutIgnoreMainLayout(Setting, '会員情報');