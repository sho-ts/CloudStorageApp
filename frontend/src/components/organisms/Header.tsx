import Link from 'next/link';
import { Container, Text, Flex } from '@chakra-ui/react';

const Header = () => {
  return (
    <header>
      <nav>
        <Container maxW={'container.xl'}>
          <Flex px={4} h={'60px'} alignItems={'center'} justify={'flex-end'}>
            <Text mr={4}><Link href="/signin">ログイン</Link></Text>
            <Text><Link href="/signup">新規登録</Link></Text>
          </Flex>
        </Container>
      </nav>
    </header>
  )
}

export default Header;