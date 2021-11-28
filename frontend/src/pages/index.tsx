import Head from 'next/head';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/utils/aws';
import { CONSTANT_VARIABLES } from '@/utils';
import { MainVisual, Feature, Architect, GetStarted, Header, Footer } from '@/components/organisms';

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
      <Header />
      <main>
        <MainVisual onClick={onClickStart} />
        <Feature />
        <Architect />
        <GetStarted onClick={onClickStart} />
      </main>
      <Footer />
    </>
  )
}

export default Home;