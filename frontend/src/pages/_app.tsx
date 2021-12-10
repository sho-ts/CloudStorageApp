import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Provider from '@/provider';
import 'destyle.css';
import '@/assets/css/base.css';
import Auth from '@/provider/AuthProvider';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <Component {...pageProps} />
  )
}
export default MyApp
