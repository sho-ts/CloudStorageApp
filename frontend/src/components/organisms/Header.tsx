import Link from 'next/link';
import { Box, Container, Text, Flex } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box as="header" bgGradient="linear(to-r, blue.500, purple.200)" py={2}>
      <Container as="nav" maxW="container.xl">
        <Flex>
          <Text as="h1" color="white" fontSize="xl">
            <Link href="/">CloudStorage</Link>
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header;