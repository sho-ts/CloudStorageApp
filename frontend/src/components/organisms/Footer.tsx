import { Box, Flex, Text, Container } from '@chakra-ui/react';
import Link from 'next/link';

const footerItems = [
  { href: '/signup', innerText: '新規登録' },
  { href: '/signin', innerText: 'ログイン' },
  { href: '/', innerText: 'よくある質問' },
  { href: '/', innerText: 'お問い合わせ' },
]

const Footer = () => {
  return (
    <Box as="footer" py={[2, 4]} bg={"black"} color="white">
      <Container maxW="container.xl">
        <Flex flexDirection={["column", "row"]} alignItems="center">
          <Text fontSize={["14px", "24px"]}>
            CloudStorageApp
        </Text>
          <Box
            flexDirection={["column", "row"]}
            ml={"auto"}
            fontSize={"14px"}
            display={["none", "flex"]}
          >
            {footerItems.map((item, index) => (
              <Text key={index} mr={4}>
                <Link href={item.href}>
                  <a>{item.innerText}</a>
                </Link>
              </Text>
            ))}
            <Text><a href="https://github.com/frontTSend" target="_blank" rel="noreferrer">Github</a></Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer;