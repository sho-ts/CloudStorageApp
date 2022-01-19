import type { Props } from './type';
import type { IconType } from 'react-icons';
import { useState } from 'react';
import styled, { css } from 'styled-components';

const TextField: React.FC<Props> = ({
  rows, value, type, placeholder, onChange, onClick, style, Icon
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Wrapper style={style} >
      {Icon && (
        <IconButton onClick={onClick}>
          <Icon size={24} />
        </IconButton>
      )}
      {placeholder && <Placeholder isActive={isFocus || value}>{placeholder}</Placeholder>}
      {rows ? (
        <TextareaBody
          icon={Icon}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
          rows={rows < 1 ? 1 : rows}
        >
          {value}
        </TextareaBody>
      ) : (
        <InputBody
          icon={Icon}
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

const InputBody = styled.input<{icon?: IconType}>`
  ${TextFieldBodyStyle}
  padding-right: ${props => props.icon ? '36px' : '16px'};
`;

const TextareaBody = styled.textarea<{icon?: IconType}>`
  ${TextFieldBodyStyle}
  padding-right: ${props => props.icon ? '36px' : '16px'};
`;

const IconButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
`;

export default TextField;