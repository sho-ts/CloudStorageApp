import { getGuestLayout } from "./getLayout";

const withGuestLayout = (Component: React.FC) => {
  const WrappedComponent = (props: any) => {
    return <Component {...props} />
  }
  WrappedComponent.getLayout = getGuestLayout;

  return WrappedComponent;
}

export default withGuestLayout;