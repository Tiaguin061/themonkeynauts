import { 
  HTMLInputTypeAttribute, 
  useEffect, 
  useRef,
} from 'react';
import { useField } from '@unform/core';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/all';

import { useBoolean } from '@/hooks';

import {
  Container,
  Content
} from './styles';

export type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  labelText?: string;
  type: HTMLInputTypeAttribute;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>
}

export function Input({
  type,
  name,
  labelText,
  containerProps,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const passwordVisible = useBoolean(false);
  const isFocused = useBoolean(false);

  function handlePasswordVisible(changeStateTo: boolean) {
    if(changeStateTo) {
      passwordVisible.changeToTrue();
    } else {
      passwordVisible.changeToFalse();
    }

    inputRef.current?.focus();
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  return (
    <Container {...containerProps} isError={!!error}>
      <span className="input_text">{labelText}</span>
      <Content
        isFocused={isFocused.state}
        isError={!!error}
        onClick={() => isFocused.changeToTrue()}
      >
        <input 
          type={type === 'password' && passwordVisible.state ? 'text': type}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={() => isFocused.changeToTrue()}
          onBlur={() => isFocused.changeToFalse()}
          {...rest}
        />
        {type === 'password' && (
          passwordVisible.state ? (
            <button
              title="Hide password"
              onClick={() => handlePasswordVisible(false)}
              className="change_visible_password"
            >
              <AiFillEyeInvisible />
            </button>
          ) : (
            <button
              title="Show password"
              onClick={() => handlePasswordVisible(true)}
              className="change_visible_password"
            >
              <AiFillEye />
            </button>
          )
        )}
      </Content>
      <span className="input_error">{error}</span>
    </Container>
  )
}