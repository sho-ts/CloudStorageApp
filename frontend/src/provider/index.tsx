import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import AuthProvider from './AuthProvider';
import store from '@/stores';

type Props = {
  children: React.ReactNode
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ChakraProvider>
    </ReduxProvider>
  )
}

export default Provider;