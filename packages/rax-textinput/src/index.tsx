import {
  forwardRef,
  useRef,
  useImperativeHandle,
  createElement,
  ForwardRefExoticComponent
} from 'rax';
import { isWeex, isWeb } from 'universal-env';
import setNativeProps from 'rax-set-native-props';
import keyboardTypeMap from './keyboardTypeMap';
import {
  TextInputProps,
  EventObject,
  TextInputElement,
  FocusEvent,
  ChangeEvent,
  InputEvent
} from './types';
import './index.css';

declare const Fragment;
let inputId = 0;

function getText(event) {
  let text = '';
  if (isWeex) {
    text = event.value;
  } else {
    text = event.target.value;
  }
  return text;
}

function genEventObject(event): EventObject {
  let text = getText(event);
  return {
    nativeEvent: {
      text
    },
    originalEvent: event,
    value: text,
    target: event.target
  };
}

const TextInput: ForwardRefExoticComponent<TextInputProps> = forwardRef(
  (props, ref) => {
    const refEl = useRef<TextInputElement>(null);
    const styleClassName = `rax-textinput-placeholder-${inputId++}`;

    const {
      className,
      accessibilityLabel,
      autoComplete,
      editable,
      keyboardType,
      maxNumberOfLines,
      maxLength,
      maxlength,
      multiline,
      numberOfLines,
      confirmType,
      randomNumber,
      showCount = true,
      selectionStart,
      selectionEnd,
      onBlur,
      onFocus,
      onChange,
      onChangeText,
      onInput,
      password,
      secureTextEntry,
      style,
      placeholderColor = '#999999',
      value,
      defaultValue
    } = props;
    const type =
      password || secureTextEntry ? 'password' : keyboardTypeMap[keyboardType];
    const setValue = (value = '') => {
      setNativeProps(refEl.current, { value });
    };
    const handleInput = (event: InputEvent) => {
      onInput(genEventObject(event));
    };

    const handleChange = (event: ChangeEvent) => {
      if (onChange) onChange(genEventObject(event));
      if (onChangeText) onChangeText(getText(event));
    };

    const handleFocus = (event: FocusEvent) => {
      onFocus(genEventObject(event));
    };

    const handleBlur = (event: FocusEvent) => {
      onBlur(genEventObject(event));
    };

    const propsCommon = {
      ...props,
      'aria-label': accessibilityLabel,
      autoComplete: autoComplete && 'on',
      maxlength: maxlength || maxLength,
      readOnly: editable !== undefined && !editable,
      onChange: (onChange || onChangeText) && handleChange,
      onInput: onInput && handleInput,
      onBlur: onBlur && handleBlur,
      onFocus: onFocus && handleFocus,
      ref: refEl
    };
    // Diff with web readonly attr, `disabled` must be boolean value
    const disbaled = isWeex ? Boolean(propsCommon.readOnly) : false;
    const rows = numberOfLines || maxNumberOfLines;

    useImperativeHandle(ref, () => {
      return {
        focus() {
          refEl.current.focus();
        },
        blur() {
          refEl.current.blur();
        },
        clear() {
          setValue('');
        }
      };
    });

    if (multiline) {
      return (
        <Fragment>
          <style x-if={isWeb && placeholderColor} dangerouslySetInnerHTML={{ __html: `.${styleClassName}::placeholder {
            color: ${placeholderColor}
          }` }} />
          <textarea
            {...propsCommon}
            className={['rax-textinput', styleClassName, className || ''].join(' ')}
            style={{
              ...style,
              placeholderColor
            }}
            row={rows}
            rows={rows}
            disabled={disbaled}
            onChange={handleChange}
            value={value || defaultValue}
            confirm-type={confirmType}
            show-count={showCount}
          >
            {isWeb && propsCommon.value}
          </textarea>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <style x-if={isWeb && placeholderColor} dangerouslySetInnerHTML={{ __html: `.${styleClassName}::placeholder {
            color: ${placeholderColor}
          }` }} />
          <input
            {...propsCommon}
            className={['rax-textinput', styleClassName, className || ''].join(' ')}
            style={{
              ...style,
              placeholderColor
            }}
            type={type}
            disabled={disbaled}
            confirm-type={confirmType}
            random-Number={randomNumber}
            selection-start={selectionStart}
            selection-end={selectionEnd}
          />
        </Fragment>
      );
    }
  }
);
TextInput.displayName = 'TextInput';
export default TextInput;
