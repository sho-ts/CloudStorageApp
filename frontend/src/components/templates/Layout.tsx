import { useSelector } from '@/hooks';
import { useDisclosure } from '@/hooks';
import { Header, UploadModal } from '@/components/organisms';
import { Container, Box, IconButton } from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';


type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const user = useSelector(state => state.user);

  return (
    <>
      <Header />
      <Box as="main">
        <Container maxW="container.xl" py={6}>
          {children}
        </Container>
      </Box>
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
    </>
  )
}

export default Layout;