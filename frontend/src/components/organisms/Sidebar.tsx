import type { DirType } from '@/types/DirType';
import styled from 'styled-components';
import { mq } from '@mixin';
import { Button, TextField } from '@/components/atoms';
import { Directories } from '@/components/molecules';

type Props = {
  handleUploadModalOpen: () => void,
  handleDirModalOpen: () => void,
  keyword: string,
  onChangeSearch: any,
  dirs?: DirType[],
}

const Sidebar: React.FC<Props> = ({
  handleUploadModalOpen, handleDirModalOpen,
  keyword, onChangeSearch, dirs,
}) => {
  return (
    <Wrapper>
      <div style={{ marginBottom: 30 }}>
        <Button onClick={handleUploadModalOpen}>アップロード</Button>
      </div>
      <div>
        <TextField
          placeholder="検索"
          value={keyword}
          onChange={onChangeSearch}
        />
      </div>
      {dirs &&
        <Directories
          modalOpen={handleDirModalOpen}
          dirs={dirs}
        />
      }
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  flex-shrink: 0;
  ${mq()} {
    max-width: 280px;
    margin-right: 24px;
  }
  ${mq('lg')} {
    margin-right: 48px;
  }
`;

export default Sidebar;