import { getUserLayout } from "./getLayout";
import Head from 'next/head'

const withUserLayoutIgnoreMainLayout = (Component: React.FC, title?: string) => {
  const WrappedComponent = (props: any) => {
    return (
      <>
        {title && (
          <Head>
            <title>{title}</title>
          </Head>
        )}
        <Component {...props} />
      </>
    )
  }
  WrappedComponent.getLayout = getUserLayout.ignoreMainLayout;

  return WrappedComponent;
}

export default withUserLayoutIgnoreMainLayout;