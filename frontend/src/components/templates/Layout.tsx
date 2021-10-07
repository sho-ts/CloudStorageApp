import { Header } from '@/components/organisms';
import { Container, Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">
        <Container maxW="container.xl" py={6}>
          {children}
        </Container>
      </Box>
    </>
  )
}

export default Layout;