import useLogic from './hook';
import { SITE_NAME } from '@/utils/const';
import { mq } from '@mixin';
import styled from 'styled-components';
import { Header, Footer } from '@/components/common/organisms';
import { MainVisual, Feature, Architect, GetStarted } from '@/components/page/lp';
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