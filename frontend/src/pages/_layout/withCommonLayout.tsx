import { getCommonLayout } from "./getLayout";
import Head from 'next/head'

const withCommonLayout = (Component: React.FC, title?: string) => {
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
  WrappedComponent.getLayout = getCommonLayout;

  return WrappedComponent;
}

export default withCommonLayout;