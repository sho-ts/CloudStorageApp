import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/utils/aws';
import { CONSTANT_VARIABLES } from '@/utils';
import { mq } from '@mixin';
import styled from 'styled-components';
import { MainVisual, Feature, Architect, GetStarted, Header, Footer } from '@/components/organisms';
import Head from 'next/head';

const Home = () => {
  const router = useRouter();

  const onClickStart = useCallback(async () => {
    const user = await auth.getUser();
    router.push(user ? '/mypage' : '/signup');
  }, [router])

  return (
    <>
      <Head>
        <title>{CONSTANT_VARIABLES.siteName}</title>
      </Head>
      <Header isGuest={true} />
      <LP>
        <MainVisual onClick={onClickStart} />
        <Feature />
        <Architect />
        <GetStarted onClick={onClickStart} />
      </LP>
      <Footer isGuest={true} />
    </>
  )
}

const LP = styled.main`
  ${mq()} {
    font-size: 18px;
  }
`;

export default Home;