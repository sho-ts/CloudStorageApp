import useLogic from './hook';
import { SITE_NAME } from '@/utils/const';
import { mq } from '@mixin';
import styled from 'styled-components';
import { MainVisual, Feature, Architect, GetStarted, Header, Footer } from '@/components/organisms';
import Head from 'next/head';

const Home = () => {
  const { onClickStart } = useLogic();

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
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