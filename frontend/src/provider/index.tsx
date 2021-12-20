import Auth from './Auth';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/stores';

const Provider: React.FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}

export const AuthProvider: React.FC<{ notRedirect?: boolean }> = ({ children, notRedirect }) => {
  return (
    <Provider>
      <Auth notRedirect={notRedirect}>{children}</Auth>
    </Provider>
  )
}

export default Provider;