import { getUserLayout } from "./getLayout";

const withUserLayoutIgnoreMainLayout = (Component: React.FC) => {
  const WrappedComponent = (props: any) => {
    return <Component {...props} />
  }
  WrappedComponent.getLayout = getUserLayout.ignoreMainLayout;

  return WrappedComponent;
}

export default withUserLayoutIgnoreMainLayout;