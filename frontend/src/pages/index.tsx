import Link from 'next/link';
import Image from 'next/image'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { auth } from '@/utils/aws';
import styled, { css } from 'styled-components';
import { CONSTANT_VARIABLES } from '@/utils';
import { MainVisual, Feature, Architect, GetStarted, Header, Footer } from '@/components/organisms';

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
        <MainVisual />
        <Feature />
        <Architect />
        <GetStarted />
      </main>
      <Footer />
    </>
  )
}

export default Home;