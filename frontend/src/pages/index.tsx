import Link from 'next/link';
import {
  Box, Text, Container, Button,
} from '@chakra-ui/react';
import { Header, Footer } from '@/components/organisms';
import Image from 'next/image'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { auth } from '@/utils/aws';
import styled from 'styled-components';
import { CONSTANT_VARIABLES } from '@/utils';
import { mq } from '@mixin';
import dbIcon from '@imgs/top/db-icon.svg';
import cloudIcon from '@imgs/top/cloud-icon.svg';
import dlIcon from '@imgs/top/dl-icon.svg';
import freeIcon from '@imgs/top/free-icon.svg';
import awsLogo from '@imgs/top/aws-logo.svg';
import cognitoLogo from '@imgs/top/cognito-logo.svg';
import ec2Logo from '@imgs/top/ec2-logo.svg';
import mysqlLogo from '@imgs/top/mysql-logo.svg';
import nestLogo from '@imgs/top/nest-logo.svg';
import nextLogo from '@imgs/top/next-logo.svg';

const features = [
  { description: '簡単にファイルをアップロード', icon: cloudIcon, mb: { base: 8, md: 0 } },
  { description: '高速なファイル転送', icon: dlIcon, mb: { base: 8, md: 0 } },
  { description: '無料で利用可能', icon: freeIcon, mb: 0 },
];

const architects = [
  { name: 'EC2', logo: ec2Logo },
  { name: 'S3', logo: awsLogo },
  { name: 'Cognito', logo: cognitoLogo },
  { name: 'MySQL', logo: mysqlLogo },
  { name: 'Next.js', logo: nextLogo },
  { name: 'Nest.js', logo: nestLogo }
];

const Home = () => {
  const router = useRouter();

  const onClickStart = async () => {
    const user = await auth.getUser();
    router.push(user ? '/mypage' : '/signup');
  }

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
                <Button onClick={onClickStart} size={"lg"} color={"black"}>始める</Button>
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
            <Row>
              {features.map((feature, index) => (
                <Box key={index} w={{ md: "32%" }} mb={feature.mb}>
                  <Icon>
                    <Image src={feature.icon} />
                  </Icon>
                  <Text fontWeight="bold">{feature.description}</Text>
                </Box>
              ))}
            </Row>
          </Container>
        </Box>
        <Box as="section" py={16} bg="gray.100">
          <Container maxW="container.sm">
            <SectionHeading>主な使用技術</SectionHeading>
            <Row>
              {architects.map((architect, index) => (
                <Box key={index} w={{ md: "32%" }} mb={8}>
                  <Logo>
                    <Image src={architect.logo} />
                  </Logo>
                  <Text fontWeight="bold">{architect.name}</Text>
                </Box>
              ))}
            </Row>
          </Container>
        </Box>
        <Box as="section" py={16} bg={"blue.500"}>
          <Container maxW="container.lg">
            <SectionHeading color="white">さぁ、今すぐ始めよう</SectionHeading>
            <Box textAlign={"center"}>
              <Button onClick={onClickStart}>始める</Button>
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

const Row = styled.div`
  width: 100%;
  text-align: center;
  ${mq()} {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const Icon = styled.figure`
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  ${mq()} {
    width: 150px;
    height: 150px;
    margin-bottom: 24px;
  }
`;

const Logo = styled.figure`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const SectionHeading = styled.h2.attrs((props: { color?: string }) => ({
  color: props.color
}))`
  margin-bottom: 32px;
  font-size: 24px;
  text-align: center;
  color: ${props => props.color ?? 'black'};
  ${mq()}  {
    margin-bottom: 40px;
    font-size: 32px;
  }
`;

export default Home;