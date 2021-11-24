import { useSelector } from '@/hooks';
import { useDisclosure } from '@/hooks';
import { Header, Footer, UploadModal } from '@/components/organisms';
import { Container, Box, IconButton } from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import styled from 'styled-components';
import { mq } from '@mixin';


type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const user = useSelector(state => state.user);

  return (
    <>
      <Header />
      <Inner>
        <Container maxW="container.xl" py={6}>
          {children}
        </Container>
      </Inner>
      {user.isSignIn && (
        <>
          <IconButton
            aria-label='upload'
            icon={<AiOutlineUpload />}
            isRound={true}
            position={"fixed"}
            bottom={4}
            right={4}
            onClick={onOpen}
          />
          <UploadModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
      <Footer />
    </>
  )
}

const Inner = styled.main`
  min-height: calc(100vh - 60px - 37px);
  ${mq()} {
    min-height: calc(100vh - 60px - 68px);
  }
`;

export default Layout;