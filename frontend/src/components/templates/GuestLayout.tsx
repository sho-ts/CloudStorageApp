import { Layout } from '@/components/templates';

const GuestLayout: React.FC = ({ children }) => {
  return (
    <Layout isGuest={true}>
      {children}
    </Layout>
  )
}

export default GuestLayout;