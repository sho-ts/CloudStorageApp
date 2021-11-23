import { useState } from 'react';
import { CONSTANT_VARIABLES } from '@/utils';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, Box, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <header>
      <Box as="nav" h={"60px"} position="relative">
        <AppTitle>
          <Link href="/">
            <a>{CONSTANT_VARIABLES.siteName}</a>
          </Link>
        </AppTitle>
        <IconButton
          onClick={handleModalOpen}
          aria-label="menuOpen"
          position={"absolute"} top={"50%"} right={"8px"}
          transform={"translateY(-50%)"}
        >
          <HamburgerIcon w={6} h={6} />
        </IconButton>
      </Box>
      <Menu open={open}>
        <IconButton
          onClick={handleModalClose}
          aria-label="menuClose"
          position={"absolute"} top={"16px"} right={"8px"}
        >
          <CloseIcon w={6} h={6} />
        </IconButton>
        {CONSTANT_VARIABLES.navItems.map((item, index) => (
          <MenuItem key={index}>
            <Link href={item.href}><a>{item.innerText}</a></Link>
          </MenuItem>
        ))}
        <MenuItem><a href="https://github.com/frontTSend" target="_blank" rel="noreferrer">Github</a></MenuItem>
      </Menu>
    </header>
  )
}

const AppTitle = styled.h1`
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;

const Menu = styled.div.attrs((props: { open: boolean }) => ({
  transform: props.open ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(0)',
  pointerEvents: props.open ? 'auto' : 'none',
}))`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${props => props.transform};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
  transition: all 0.3s;
  pointer-events: ${props => props.pointerEvents};
  z-index: 9999999;
`;

const MenuItem = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
  &:not(:last-child) {
    margin-bottom: 16px;
    @media screen and (min-width: 768px) {
      margin-bottom: 16px;
    }
  }
`;


export default Header;