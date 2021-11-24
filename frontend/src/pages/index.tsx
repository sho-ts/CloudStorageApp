import Link from 'next/link';
import { Box, Flex, Text, Container, Button } from '@chakra-ui/react';
import { Header, Footer } from '@/components/organisms';
import Image from 'next/image'
import dbIcon from '@/assets/imgs/db-icon.svg';
import cloudIcon from '@/assets/imgs/cloud-icon.svg';
import dlIcon from '@/assets/imgs/dl-icon.svg';
import freeIcon from '@/assets/imgs/free-icon.svg';
import Head from 'next/head';
import styled from 'styled-components';
import { CONSTANT_VARIABLES } from '@/utils';
import { mq } from '@mixin';

const features = [
  { description: '簡単にファイルをアップロード', icon: cloudIcon, mb: { base: 8, md: 0 } },
  { description: '高速なファイル転送', icon: dlIcon, mb: { base: 8, md: 0 } },
  { description: '無料で利用可能', icon: freeIcon, mb: 0 },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>{CONSTANT_VARIABLES.siteName}</title>
      </Head>
      <Header />
      <main>
        <Box bgColor="blue.500" >
          <Container h={{ base: 600, md: 700, lg: 500 }} maxW={'container.xl'} position={"relative"}>
            <MVInner>
              <Catch>大切なデータをバックアップしよう</Catch>
              <Read>CloudStorageAppはデータを<br />クラウド上に保存することができるアプリケーションです</Read>
              <Box textAlign={"center"}>
                <Link href="/signup">
                  <a>
                    <Button size={"lg"} color={"black"}>始める</Button>
                  </a>
                </Link>
              </Box>
            </MVInner>
            <Box
              position={"absolute"} bottom={["24px"]}
              right={"24px"} w={"200px"}
            >
              <Image src={dbIcon} />
            </Box>
          </Container>
        </Box>
        <Box as="section" py={16}>
          <Container maxW={"container.md"}>
            <SectionHeading>CloudStorageAppの特徴</SectionHeading>
            <Features>
              {features.map((feature, index) => (
                <Box key={index} w={{ md: "32%" }} mb={feature.mb}>
                  <FeatureIcon>
                    <Image src={feature.icon} />
                  </FeatureIcon>
                  <Text fontWeight="bold">{feature.description}</Text>
                </Box>
              ))}
            </Features>
          </Container>
        </Box>
        <Box as="section" py={16} bg={"blue.500"}>
          <Container maxW="container.lg">
            <SectionHeading color="white">さぁ、今すぐ始めよう</SectionHeading>
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

const MVInner = styled.div`
  position: absolute;
  top: 48px;
  left: 16px;
  width: calc(100% - 32px);
  color: white;
  font-weight: bold;
  z-index: 999;
  ${mq()} {
    top: 64px;
  }
  ${mq('lg')} {
    top: 84px;
  }
`;

const Catch = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  ${mq()} {
    font-size: 40px;
    margin-bottom: 32px;
  }
  ${mq('lg')} {
    font-size: 64px;
  }
`;

const Read = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 24px;
  ${mq()} {
    font-size: 24px;
    margin-bottom: 32px;
  }
`;

const Features = styled.div`
  width: 100%;
  text-align: center;
  ${mq()} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const FeatureIcon = styled.figure`
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  ${mq()} {
    width: 150px;
    height: 150px;
    margin-bottom: 24px;
  }
`;

const SectionHeading = styled.h2.attrs((props: { color?: string }) => ({
  color: props.color
}))`
  margin-bottom: 24px;
  font-size: 24px;
  text-align: center;
  color: ${props => props.color ?? 'black'};
  ${mq()}  {
    font-size: 32px;
    margin-bottom: 32px;
  }
`;

export default Home;