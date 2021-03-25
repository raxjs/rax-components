// @ts-nocheck
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  createElement,
  ForwardRefExoticComponent,
  useEffect,
  useState
} from 'rax';
import { isWeex, isWeb, isWeChatMiniProgram, isNode, isMiniApp } from 'universal-env';
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
    const [, forceUpdate] = useState(0);
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
      defaultValue,
      controlled
    } = props;
    let type =
      password || secureTextEntry
        ? 'password'
        : typeof keyboardTypeMap[keyboardType] === 'undefined'
          ? keyboardType
          : keyboardTypeMap[keyboardType];

    // Check is type supported or not
    // Use isWeb to exclude web-view
    if (isMiniApp && !isWeb) {
      const basicSupportTypes = ['text', 'number', 'idcard', 'digit'];
      // Other types, like numberpad, we can check it with canIUse
      if (!basicSupportTypes.includes(type) && !my.canIUse(`input.type.${type}`)) {
        // If not support, fallback to text
        type = 'text';
      }
    }

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
      onChange: (onChange || onChangeText) && handleChange,
      onInput: (e: InputEvent) => {
        onInput && handleInput(e);
        if (!isWeChatMiniProgram) {
          forceUpdate(tick => tick + 1);
        }
      },
      onBlur: onBlur && handleBlur,
      onFocus: onFocus && handleFocus,
      ref: refEl
    };

    // Diff with web readonly attr, `disabled` must be boolean value
    const disbaled = Boolean(editable !== undefined && !editable);
    const rows = numberOfLines || maxNumberOfLines;
    useImperativeHandle(ref, () => {
      return {
        _nativeNode: refEl.current,
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
    useEffect(() => {
      if (controlled && typeof value !== 'undefined' && value !== null && refEl.current) {
        const currentValue = refEl.current.value;
        const newValue = '' + value;
        if (currentValue !== newValue) {
          refEl.current.value = newValue;
        }
      }
    });

    if (multiline) {
      return (
        <Fragment>
          {/* style should not render in miniapp */}
          <style x-if={(isWeb || isNode) && placeholderColor} dangerouslySetInnerHTML={{ __html: `.${styleClassName}::placeholder {
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
            // @ts-ignore
            onChange={handleChange}
            value={value || defaultValue}
            confirm-type={confirmType}
            show-count={showCount}
          >
            {/* undefined will be rendered to comment node in ssr */}
            {!isWeex && (propsCommon.value || defaultValue || '')}
          </textarea>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <style x-if={(isWeb || isNode) && placeholderColor} dangerouslySetInnerHTML={{ __html: `.${styleClassName}::placeholder {
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
            value={value || defaultValue}
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
