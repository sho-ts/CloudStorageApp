import styled from 'styled-components';

const SubTitle: React.FC = ({ children }) => {
  return <Text>{children}</Text>
}

const Text = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export default SubTitle;