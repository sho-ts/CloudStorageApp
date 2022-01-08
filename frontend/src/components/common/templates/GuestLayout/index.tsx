import { FlashMessage } from '@/components/common/atoms';
import { Layout } from '@/components/common/templates';

const GuestLayout: React.FC = ({ children }) => {
  return (
    <Layout isGuest={true}>
      <FlashMessage />
      {children}
    </Layout>
  )
}

export default GuestLayout;