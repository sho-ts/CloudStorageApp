import { getGuestLayout } from "./getLayout";
import Head from 'next/head'

const withGuestLayout = (Component: React.FC, title?: string) => {
  const WrappedComponent = (props: any) => {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Component {...props} />
      </>
    )
  }
  WrappedComponent.getLayout = getGuestLayout;

  return WrappedComponent;
}

export default withGuestLayout;