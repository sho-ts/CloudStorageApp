import styled from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';

type Props = {
  onClick?: any,
  data?: any,
}

const ItemTitle: React.FC<Props> = ({ onClick, data, children }) => {
  return (
    <Wrapper>
      <Text>{children}</Text>
      {onClick && data && (
        <Setting onClick={onClick}><AiFillSetting size={28} color="#888" /></Setting>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  height: 45px;
`;

const Text = styled.h2`
  font-size: 20px;
`;

const Setting = styled.button`
  margin-left: 8px;
`;

export default ItemTitle;