import { getUserLayout } from "./getLayout";

const withUserLayout = (Component: React.FC) => {
  const WrappedComponent = (props: any) => {
    return <Component {...props} />
  }
  WrappedComponent.getLayout = getUserLayout;

  return WrappedComponent;
}

export default withUserLayout;