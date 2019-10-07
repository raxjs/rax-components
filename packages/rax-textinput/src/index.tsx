import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  createElement,
  CSSProperties,
  Ref
} from 'rax';
import { isWeex } from 'universal-env';

const keyboardTypeMap = {
  default: 'text',
  'ascii-capable': 'text',
  'numbers-and-punctuation': 'number',
  url: 'url',
  'number-pad': 'number',
  'phone-pad': 'tel',
  'name-phone-pad': 'text',
  'email-address': 'email',
  'decimal-pad': 'number',
  twitter: 'text',
  'web-search': 'search',
  numeric: 'number'
};

export type TextInputKeyboardType = keyof (typeof keyboardTypeMap);

export type TextInputElement = (HTMLInputElement | HTMLTextAreaElement) & {
  setAttr: (key: string, value: string, silent: boolean) => void;
};
export interface TextInputFocusEvent extends Rax.FocusEvent<TextInputElement> {
  value: string;
}
export interface TextInputChangeEvent
  extends Rax.ChangeEvent<TextInputElement> {
  value: string;
}
export interface TextInputFormEvent extends Rax.FormEvent<TextInputElement> {
  value: string;
  target: TextInputElement;
}
interface NativeEvent {
  text: string;
}
interface EventObject {
  nativeEvent: NativeEvent;
  originalEvent:
  | TextInputChangeEvent
  | TextInputFocusEvent
  | TextInputFormEvent;
  value: string;
  target: HTMLInputElement | HTMLTextAreaElement;
}

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

export interface TextInputProps {
  style?: Rax.CSSProperties;
  autoFocus?: boolean;
  editable?: boolean;
  keyboardType?: TextInputKeyboardType;
  maxLength?: number;
  maxlength?: number;
  placeholder?: string;
  password?: boolean;
  secureTextEntry?: boolean;
  value?: string;
  defaultValue?: string;
  accessibilityLabel?: string; // cant`t support miniapp
  autoComplete?: boolean; // cant`t support miniapp
  maxNumberOfLines?: number; // cant`t support miniapp
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: (e: EventObject) => void;
  onFocus?: (e: EventObject) => void;
  onChange?: (e: EventObject) => void;
  onInput?: (e: EventObject) => void;
  onChangeText?: (text: string) => void;
}

const styles = {
  initial: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderColor: '#000000',
    borderWidth: 0,
    boxSizing: 'border-box',
    color: '#000000',
    padding: 0,
    paddingLeft: 24,
    fontSize: 24,
    lineHeight: 60,
    height: 60 // default height
  }
};
const TextInput = forwardRef((props: TextInputProps, ref: Ref<any>) => {
  const refEl = useRef<TextInputElement | null>(null);

  function setValue(value = '') {
    if (isWeex) {
      refEl.current.setAttr('value', value, false); // weex api.
    } else if (refEl.current.setAttribute) {
      refEl.current.setAttribute('value', value);
      refEl.current.value = value;
    }
  }

  useEffect(() => {
    setValue(props.value);
  });

  const {
    accessibilityLabel,
    autoComplete,
    editable,
    keyboardType,
    maxNumberOfLines,
    maxLength,
    maxlength,
    multiline,
    numberOfLines,
    onBlur,
    onFocus,
    onChange,
    onChangeText,
    onInput,
    password,
    secureTextEntry,
    style,
    value,
    defaultValue
  } = props;

  const handleInput = event => {
    onInput(genEventObject(event));
  };

  const handleChange = event => {
    if (onChange) onChange(genEventObject(event));
    if (onChangeText) onChangeText(getText(event));
  };

  const handleFocus = (event: TextInputFocusEvent) => {
    onFocus(genEventObject(event));
  };

  const handleBlur = (event: TextInputFocusEvent) => {
    onBlur(genEventObject(event));
  };

  const focus = () => {
    refEl.current.focus();
  };

  const blur = () => {
    refEl.current.blur();
  };

  const clear = () => {
    setValue('');
  };
  useImperativeHandle(ref, () => {
    return {
      _nativeNode: refEl.current,
      focus,
      blur,
      clear,
    };
  });
  const propsCommon = {
    ...props,
    'aria-label': accessibilityLabel,
    autoComplete: autoComplete && 'on',
    maxlength: maxlength || maxLength,
    readOnly: false,
    onChange: (onChange || onChangeText) && handleChange,
    onInput: onInput && handleInput,
    onBlur: onBlur && handleBlur,
    onFocus: onFocus && handleFocus,
    style: { ...styles.initial as CSSProperties, ...style },
    ref: refEl
  };
  if (value) {
    delete propsCommon.defaultValue;
  } else {
    propsCommon.value = value || defaultValue;
  }

  if (typeof editable !== 'undefined' && !editable) {
    propsCommon.readOnly = true;
  }

  let type = keyboardTypeMap[keyboardType];
  if (password || secureTextEntry) {
    type = 'password';
  }

  if (isWeex) {
    // Diff with web readonly attr, `disabled` must be boolean value
    const disabled = Boolean(propsCommon.readOnly);
    if (multiline) {
      // https://weex.apache.org/zh/docs/components/textarea.html
      return <textarea {...propsCommon} row={2} disabled={disabled} />;
    } else {
      // https://weex.apache.org/zh/docs/components/input.html
      return <input {...propsCommon} type={type} disabled={disabled} />;
    }
  } else {
    if (multiline) {
      const propsMultiline = {
        maxRows: maxNumberOfLines || numberOfLines,
        minRows: numberOfLines
      };
      // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea
      return (
        <textarea {...propsCommon} rows={numberOfLines} {...propsMultiline}>
          {propsCommon.value}
        </textarea>
      );
    }
    // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input
    return <input {...propsCommon} type={type} />;
  }
});
export default TextInput;
