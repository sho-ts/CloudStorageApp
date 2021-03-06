import type { Props } from './type';
import { Header, Footer } from '@/components/common/organisms';
import styled from 'styled-components';
import { mq } from '@mixin';

const Layout: React.FC<Props> = ({ children, isGuest }) => {
  return (
    <>
      <Header isGuest={isGuest} />
      <Inner>
        {children}
      </Inner>
      <Footer isGuest={isGuest} />
    </>
  )
}

const Inner = styled.div`
  min-height: calc(100vh - 60px - 37px);
  padding: 24px 0;
  ${mq()} {
    min-height: calc(100vh - 60px - 68px);
    padding: 32px 0;
  }
`;

export default Layout;