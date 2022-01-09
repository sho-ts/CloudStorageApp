import { getUserLayout } from "./getLayout";
import Head from 'next/head'

const withUserLayout = (Component: React.FC, title?: string) => {
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
  WrappedComponent.getLayout = getUserLayout;

  return WrappedComponent;
}

export default withUserLayout;