import Link from 'next/link';
import { Box, Flex, Text, Container, Button } from '@chakra-ui/react';
import { Header, Footer } from '@/components/organisms';
import Image from 'next/image'
import dbIcon from '@/assets/imgs/db-icon.svg';
import cloudIcon from '@/assets/imgs/cloud-icon.svg';
import dlIcon from '@/assets/imgs/dl-icon.svg';
import freeIcon from '@/assets/imgs/free-icon.svg';

const features = [
  { description: '簡単にファイルをアップロード', icon: cloudIcon, mb: { base: 8, md: 0 } },
  { description: '高速なファイル転送', icon: dlIcon, mb: { base: 8, md: 0 } },
  { description: '無料で利用可能', icon: freeIcon, mb: 0 },
];

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Box bgColor="blue.500" >
          <Container h={{ base: 600, md: 700, lg: 500 }} maxW={'container.xl'} position={"relative"}>
            <Box
              position={"absolute"} top={["48px", "64px", "84px"]}
              left={"16px"} width={"calc(100% - 32px)"}
              color={"white"} fontWeight={"bold"} zIndex={99999}
            >
              <Text fontSize={["32px", "40px", "64px"]} mb={6}>
                大切なデータをバックアップしよう
              </Text>
              <Text fontSize={["18px", "24px"]} lineHeight={"1.8"} mb={6}>
                CloudStorageAppはデータを<br />クラウド上に保存することができるアプリケーションです
              </Text>
              <Box textAlign={"center"}>
                <Link href="/signup">
                  <a>
                    <Button size={"lg"} color={"black"}>始める</Button>
                  </a>
                </Link>
              </Box>
            </Box>
            <Box
              position={"absolute"} bottom={["24px"]}
              right={["24px"]} w={["200px"]}
            >
              <Image src={dbIcon} />
            </Box>
          </Container>
        </Box>
        <Box py={16}>
          <Container maxW={"container.md"}>
            <Text textAlign={"center"} fontSize={["24px", "32px"]} mb={8} >
              CloudStorageAppの特徴
            </Text>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              w={"100%"} justifyContent={{ md: "space-between" }}
              alignItems={["center"]} textAlign="center"
            >
              {features.map((feature, index) => (
                <Box key={index} w={{ md: "24%" }} mb={feature.mb}>
                  <Box w={["200px", "150px"]} h={["200px", "150px"]} mx="auto" mb={4}>
                    <Image src={feature.icon} />
                  </Box>
                  <Text fontWeight="bold">{feature.description}</Text>
                </Box>
              ))}
            </Flex>
          </Container>
        </Box>
        <Box py={16} bg={"blue.500"}>
          <Container maxW="container.lg">
            <Text
              textAlign={"center"} fontSize={["24px", "32px"]}
              mb={8} color={"white"}
            >
              さぁ、今すぐ始めよう
            </Text>
            <Box textAlign={"center"}>
              <Link href="/signup">
                <a>
                  <Button>始める</Button>
                </a>
              </Link>
            </Box>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  )
}

export default Home;