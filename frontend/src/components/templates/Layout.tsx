import { useSelector } from '@/hooks';
import { Header, Footer } from '@/components/organisms';
import styled from 'styled-components';
import { mq } from '@mixin';


type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const user = useSelector(state => state.user);

  return (
    <>
      <Header />
      <Inner>
          {children}
      </Inner>
      <Footer />
    </>
  )
}

const Inner = styled.main`
  min-height: calc(100vh - 60px - 37px);
  padding: 24px 16px;
  ${mq()} {
    min-height: calc(100vh - 60px - 68px);
    padding: 32px 24px;
  }
`;

export default Layout;