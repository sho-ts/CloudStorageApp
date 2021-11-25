import { Provider as ReduxProvider } from 'react-redux';
import store from '@/stores';

type Props = {
  children: React.ReactNode
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}

export default Provider;