import type { AppProps } from 'next/app'
import Provider from '@/provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
