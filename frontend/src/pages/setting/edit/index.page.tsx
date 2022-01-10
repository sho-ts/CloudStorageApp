import useLogic from './hook';
import { withUserLayoutIgnoreMainLayout } from '@layout';
import { PageTitle, Button, TextField } from '@/components/common/atoms';
import { Box } from '@/components/common/molecules';
import { Container } from '@/components/common/templates';

const Setting = () => {
  const { isMounted, name, setName, save } = useLogic();

  return (
    <>
      {isMounted && (
        <Container size="md">
          <PageTitle>会員情報編集</PageTitle>
          <Box>
            <Box>
              <TextField
                placeholder="ユーザー名"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </Box>
          </Box>
          <Box align="center">
            <Button onClick={save}>完了</Button>
          </Box>
        </Container>
      )}
    </>
  )
}

export default withUserLayoutIgnoreMainLayout(Setting, '会員情報編集');