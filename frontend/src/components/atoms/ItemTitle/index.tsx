import type { Props } from './type';
import styled from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';

const ItemTitle: React.FC<Props> = ({ onClick, data, children, Icon, IconColor, style }) => {
  return (
    <Wrapper style={style}>
      <Text>
        {Icon && <IconWrapper><Icon color={IconColor} size={28} /></IconWrapper>}
        <h2>{children}</h2>
      </Text>
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

const IconWrapper = styled.div`
  margin-right: 0.5em;
`;

const Text = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Setting = styled.button`
  margin-left: 8px;
`;

export default ItemTitle;