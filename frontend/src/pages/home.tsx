import styled from 'styled-components';
import { Box, Flex, Text, Container, Button } from '@chakra-ui/react';
import Image from 'next/image'
import dbIcon from '@/assets/imgs/db-icon.svg';
import cloudIcon from '@/assets/imgs/cloud-icon.svg';
import dlIcon from '@/assets/imgs/dl-icon.svg';
import freeIcon from '@/assets/imgs/free-icon.svg';

const Home = () => {
  return (
    <>
      <Box>
        <Box>
          <Container maxW={'container.xl'}>
            <Flex px={4} h={'60px'} alignItems={'center'} justify={'flex-end'}>
              <Text mr={4}>ログイン</Text>
              <Text>新規登録</Text>
            </Flex>
          </Container>
        </Box>
      </Box>
      <Box bgColor="blue.500" >
        <Container h={["600px", "700px", "500px"]} maxW={'container.xl'} position={"relative"}>
          <Box
            position={"absolute"}
            top={["48px", "64px", "84px"]}
            left={"16px"}
            width={"calc(100% - 32px)"}
            color="white" fontWeight={"bold"}
            zIndex={99999}
          >
            <Text fontSize={["32px", "40px", "64px"]} mb={6}>
              大切なデータをバックアップしよう
            </Text>
            <Text fontSize={["18px", "24px"]} lineHeight={"1.8"} mb={6}>
              CloudStorageAppはデータを<br />クラウド上に保存することができるアプリケーションです
            </Text>
            <Box textAlign="center">
              <Button size="lg" color="black">始める</Button>
            </Box>
          </Box>
          <Box
            position={"absolute"}
            bottom={["24px"]}
            right={["24px"]}
            w={["200px"]}
          >
            <Image src={dbIcon} />
          </Box>
        </Container>
      </Box>
      <Box py={16}>
        <Container maxW="container.lg">
          <Text
            textAlign="center"
            fontSize={["24px", "32px"]}
            mb={8}
          >
            CloudStorageAppの特徴
          </Text>
          <Flex
            flexDirection={["column", "row"]}
            w={"100%"}
            justifyContent={{ md: "space-between" }}
            alignItems={["center"]}
            textAlign="center"
          >
            <Box w={{ md: "24%" }} mb={[8, 0]}>
              <Box w={["200px", "150px"]} h={["200px", "150px"]} mx="auto" mb={4}>
                <Image src={cloudIcon} />
              </Box>
              <Text fontWeight="bold">簡単にファイルをアップロード</Text>
            </Box>
            <Box w={{ md: "24%" }} mb={[8, 0]}>
              <Box w={["200px", "150px"]} h={["200px", "150px"]} mx="auto" mb={4}>
                <Image src={dlIcon} />
              </Box>
              <Text fontWeight="bold">高速なファイル転送</Text>
            </Box>
            <Box w={{ md: "24%" }}>
              <Box w={["200px", "150px"]} h={["200px", "150px"]} mx="auto" mb={4}>
                <Image src={freeIcon} />
              </Box>
              <Text fontWeight="bold">無料で利用可能</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box py={16} bg={"blue.500"}>
        <Container maxW="container.lg">
          <Text
            textAlign="center"
            fontSize={["24px", "32px"]}
            mb={8}
            color="white"
          >
            さぁ、今すぐ始めよう
          </Text>
          <Box textAlign="center">
            <Button>新規登録</Button>
          </Box>
        </Container>
      </Box>
      <Box py={[8, 4]} bg={"black"} color="white">
        <Container maxW="container.xl">
          <Flex flexDirection={["column", "row"]} alignItems="center">
            <Text fontSize={"24px"}>
              CloudStorageApp
            </Text>
            <Box
              flexDirection={["column", "row"]}
              ml={{ md: "auto" }}
              fontSize={"14px"}
              display={["none", "flex"]}
            >
              <Text mr={4}>新規登録</Text>
              <Text mr={4}>ログイン</Text>
              <Text mr={4}>よくある質問</Text>
              <Text mr={4}>お問い合わせ</Text>
              <Text>Github</Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Home;