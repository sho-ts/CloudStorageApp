import type { AppProps } from 'next/app'
import Provider from '@/provider';
import 'destyle.css';
import '@/assets/css/base.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
