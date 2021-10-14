import styled from 'styled-components';
import { FileList } from '@/components/molecules';

const Inner = styled.div`
  padding-top: 100%;
  position: relative;
`;

const DropArea = styled.div`
  border: 2px dotted #000;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`

type Props = {

}

const UploadArea: React.FC<Props> = () => {
  return (
    <Inner>
      <DropArea>
        <Text>ここにファイルをドロップ</Text>
      </DropArea>
    </Inner>
  )
}

export default UploadArea;