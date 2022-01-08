import type { Props } from './type';
import styled from 'styled-components';
import { mq } from '@mixin';
import { Button, TextField } from '@/components/common/atoms';
import { Directories } from '@/components/common/molecules';

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
  ${mq('md', 'down')} {
    display: none;
  }
  ${mq()} {
    max-width: 280px;
    margin-right: 24px;
  }
  ${mq('lg')} {
    margin-right: 48px;
  }
`;

export default Sidebar;