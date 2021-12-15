import { useState } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  value?: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
  onChange?: any,
  onClick?: any,
}

const TextField: React.FC<Props> = ({
  rows, value, type, placeholder, onChange, onClick, style
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Wrapper
      onClick={onClick}
      style={style}
    >
      {placeholder && <Placeholder isActive={isFocus || value}>{placeholder}</Placeholder>}
      {rows ? (
        <TextareaBody
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          rows={rows < 1 ? 1 : rows}
        >
          {value}
        </TextareaBody>
      ) : (
        <InputBody
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChange={onChange}
          type={type ?? 'text'}
        />
      )}
    </Wrapper>
  )
}

const transitionDuration = '0.5s';

const Wrapper = styled.div`
  position: relative;
`

const Placeholder = styled.label<{ isActive?: boolean | string }>`
  position: absolute;
  top: 0;
  left: 0;
  transition: all ${transitionDuration};
  transform-origin: left top;
  transform: ${props => props.isActive ? 'scale(0.6) translate(28px, 10px)' : 'translate(16px, 14px)'};
  opacity: 0.3;
  pointer-events: none;
`

const TextFieldBodyStyle = css`
  display: block;
  width: 100%;
  height: 100%;
  padding: 18px 16px 4px;
  transition: all ${transitionDuration};
  border: 1px solid #a3a3a3;
  background-color: #fff;
  border-radius: 8px;
  `

const InputBody = styled.input`${TextFieldBodyStyle};`;

const TextareaBody = styled.textarea`${TextFieldBodyStyle}`;


export default TextField;