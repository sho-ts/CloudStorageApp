import type { DirType } from '@/types/DirType';
import { useSelector, useModal } from '@/hooks';
import styled from 'styled-components';
import {
  AiTwotoneHome, AiOutlineHome,
  AiTwotoneFolderOpen, AiOutlineFolderOpen,
} from 'react-icons/ai'
import { IoCloudUploadOutline, IoCloudUploadSharp } from 'react-icons/io5';
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'
import { SearchModal, DirsModal } from '@/components/organisms';
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  dirs?: DirType[]
  uploadModalOpen: () => void
}

const BottomNav: React.FC<Props> = ({
  dirs, uploadModalOpen
}) => {
  const { isSmallWindowSize } = useSelector(props => props.windowSize);
  const [searchModalisOpen, handleSearchModalOpen, handleSearchModalClose] = useModal();
  const [dirsModalOpen, handleDirsModalOpen, handleDirsModalClose] = useModal();
  const [activeButton, setActiveButton] = useState<number | null>(null);

  return (
    <>
      {isSmallWindowSize && (
        <>
          <Wrapper>
            <Inner>
              <Button onClick={() => { setActiveButton(1) }}>
                <Link href="/mypage">
                  <a>
                    {activeButton === 1 ? <AiTwotoneHome size="24" /> : <AiOutlineHome size="24px" />}
                  </a>
                </Link>
              </Button>
              <Button onClick={() => { handleSearchModalOpen(); setActiveButton(2); }}>
                {activeButton === 2 ? <RiSearchFill size="24px" /> : <RiSearchLine size="24px" />}
              </Button>
              <Button onClick={() => { handleDirsModalOpen(); setActiveButton(3) }}>
                {activeButton === 3 ? <AiTwotoneFolderOpen size="24px" /> : <AiOutlineFolderOpen size="24px" />}
              </Button>
              <Button onClick={() => { uploadModalOpen(); setActiveButton(4) }}>
                {activeButton === 4 ? <IoCloudUploadSharp size="24px" /> : <IoCloudUploadOutline size="24px" />}
              </Button>
            </Inner>
          </Wrapper>
          <SearchModal isOpen={searchModalisOpen} onClose={handleSearchModalClose} />
          <DirsModal dirs={dirs} isOpen={dirsModalOpen} onClose={handleDirsModalClose} />
        </>
      )}
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 52px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  z-index: 10000;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 24px;
`;

const Button = styled.button`
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default BottomNav;