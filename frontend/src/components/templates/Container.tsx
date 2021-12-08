import styled from 'styled-components';

type Props = {
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties;
}

const Container: React.FC<Props> = ({ size, style, children }) => {
  return (
    <div style={style}>
      <Body className={`_${size ?? 'lg'}`}>
        {children}
      </Body>
    </div>
  )
}

const Body = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  &._sm {
    max-width: 500px;
  }
  &._md {
    max-width: 700px;
  }
  &._lg {
    max-width: 1000px;
  }
`;

export default Container;