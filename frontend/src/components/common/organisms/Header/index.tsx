import type { Props } from './type';
import { useModal } from '@/hooks';
import styled, { css } from 'styled-components';
import { SiteLogo } from '@/components/common/atoms';
import { HeaderNav } from '@/components/common/molecules'
import Link from 'next/link';

const Header: React.FC<Props> = ({ isGuest }) => {
  const [isOpen, handleModalOpen, handleModalClose] = useModal();

  return (
    <>
      <Wrapper>
        <Link href={isGuest ? '/' : '/mypage'}>
          <a>
            <SiteLogo />
          </a>
        </Link>
        <ToggleButton alia-label="menu" onClick={handleModalOpen}><span /></ToggleButton>
      </Wrapper>
      <HeaderNav isGuest={isGuest} isOpen={isOpen} onClose={handleModalClose} />
    </>
  )
}

const Wrapper = styled.header`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #ddd;
`;

const ButtonBorderStyle = css`
  position: absolute;
  width: 34px;
  height: 2px;
  background-color: #000;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 60px;
  width: 60px;
  span {
    ${ButtonBorderStyle}
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: '';
      ${ButtonBorderStyle}
      top: -10px;
      left: 0;
    }
    &::after {
      content: '';
      ${ButtonBorderStyle};
      top: 10px;
      left: 0;
    }
  }
`;

export default Header;