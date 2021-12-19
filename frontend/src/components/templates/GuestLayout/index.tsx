import { FlashMessage } from '@/components/atoms';
import { Layout } from '@/components/templates';

const GuestLayout: React.FC = ({ children }) => {
  return (
    <Layout isGuest={true}>
      <FlashMessage />
      {children}
    </Layout>
  )
}

export default GuestLayout;