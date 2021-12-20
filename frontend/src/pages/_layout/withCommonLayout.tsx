import { getCommonLayout } from "./getLayout";

const withCommonLayout = (Component: React.FC) => {
  const WrappedComponent = (props: any) => {
    return <Component {...props} />
  }
  WrappedComponent.getLayout = getCommonLayout;

  return WrappedComponent;
}

export default withCommonLayout;