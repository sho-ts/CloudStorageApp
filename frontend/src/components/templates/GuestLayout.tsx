import Provider from '@/provider';
import { Layout } from '@/components/templates';

const GuestLayout: React.FC = ({ children }) => {
  return (
    <Provider>
      <Layout isGuest={true}>
        {children}
      </Layout>
    </Provider>
  )
}

export default GuestLayout;