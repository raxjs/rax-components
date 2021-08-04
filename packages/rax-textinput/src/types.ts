import * as Rax from 'rax';
import keyboardTypeMap from './keyboardTypeMap';

/**
 * component:(文本输入)
 * document(文档地址)：
 * https://github.com/raxjs/rax-text
 */
export interface InputDeviceCapabilities {
  readonly firesTouchEvents: boolean;
}

export interface NativeEvent {
  readonly text: string;
}

export type TextInputElement = HTMLInputElement | HTMLTextAreaElement;

export interface FocusEvent extends Rax.FocusEvent {
  readonly sourceCapabilities?: InputDeviceCapabilities;
  readonly path?: Element[];
}

export interface ChangeEvent extends Rax.ChangeEvent<TextInputElement> {
  readonly composed?: boolean;
  readonly path?: Element[];
}

export interface InputEvent extends ChangeEvent {
  readonly data?: string;
  readonly dataTransfer?: string;
  readonly detail?: number;
  readonly inputType?: string;
  readonly isComposing?: boolean;
  readonly sourceCapabilities?: InputDeviceCapabilities;
}

export interface EventObject {
  nativeEvent: NativeEvent;
  originalEvent: FocusEvent | ChangeEvent | InputEvent;
  value: string;
  target: TextInputElement;
}

export type TextInputKeyboardType = keyof (typeof keyboardTypeMap);

export interface TextInputProps
  extends Rax.RefAttributes<{
    _nativeNode: TextInputElement;
    focus: () => void;
    blur: () => void;
    clear: () => void;
  }>,
  Omit<
  Rax.InputHTMLAttributes<HTMLInputElement> &
  Rax.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onBlur' | 'onChange' | 'onInput' | 'onFocus'
  > {
  /**
   * define this property text box to enter multiple lines of text Defaults to false
   * (定义该属性文本框可以输入多行文字)
   * default(默认值)：false
   */
  multiline?: boolean;

  /**
   * adding an element to an element
   * (为元素添加标识)
   */
  accessibilityLabel?: string;

  /**
   * can you edit
   * (是否可以编辑)
   * default(默认)：true
   */
  editable?: boolean;

  /**
   * set which kind of soft keyboard pops up
   * (设置弹出哪种软键盘)
   */
  keyboardType?: TextInputKeyboardType;

  /**
   * set the maximum input value
   * (设置最大可输入值)
   */
  maxLength?: number;

  /**
   * set the maximum number of rows when the text box is mutiline
   * (当文本框为mutiline时设置最多的行数)
   */
  maxNumberOfLines?: number;

  /**
   * set the number of rows as above
   * (同上设置行数)
   */
  numberOfLines?: number;

  /**
   * set the number of rows as above
   * (设置文本框提示)
   */
  placeholder?: string;

  /**
   * text box content password display
   * (文本框内容密码显示)
   */
  password?: boolean;

  /**
   * same as text box content password display
   * (同上文本框内容密码显示)
   */
  secureTextEntry?: boolean;

  /**
   * text content of the text box (controlled)
   * (文本框的文字内容 (受控))
   */
  value?: string;

  /**
   * text content of the text box (uncontrolled)
   * (文本框的文字内容,[非受控])
   */
  defaultValue?: string;

  /**
   * Is it fully controlled
   * (是否完全受控)
   */
  controlled?: boolean;

  /**
   * Placeholder color
   * (占位文字颜色)
   */
  placeholderColor?: string;

  /**
   * Set the text of the button at the bottom right corner of the keyboard (miniapp)
   * (设置键盘右下角按钮的文字,[小程序])
   */
  confirmType?: any;

  /**
   * When type is number, digit, idcard, whether the numeric keyboard is arranged randomly (miniapp)
   * (当 type 为 number, digit, idcard 数字键盘是否随机排列,[小程序])
   */
  randomNumber?: boolean;

  /**
   * Whether to display word count (miniapp)
   * (是否显示字数统计,[小程序])
   */
  showCount?: boolean;

  /**
   * The starting position of the focus cursor corresponding to the selected text (miniapp)
   * (选中文本对应的焦点光标起始位置,[小程序])
   */
  selectionStart?: number;

  /**
   * The end position of the focus cursor corresponding to the selected text (miniapp)
   * (选中文本对应的焦点光标结束位置,[小程序])
   */
  selectionEnd?: number;

  /**
   * this function is called when the text box is out of focus. onBlur={() => console.log('lost focus')}
   * (文本框失焦时调用此函数。onBlur={() => console.log('失焦啦')})
   * @param {EventObject} event
   */
  onBlur?: (event: EventObject) => void;

  /**
   * call this function when the textbox gets focus
   * (文本框获得焦点时调用此函数)
   * @param {EventObject} event
   */
  onFocus?: (event: EventObject) => void;

  /**
   * this function is called when the content of the text box changes (triggered when the user input completes. Usually after the blur event)
   * (文本框内容变化时调用此函数，[用户输入完成时触发。通常在 blur 事件之后])
   * @param {EventObject} event
   */
  onChange?: (event: EventObject) => void;
  onChangeText?: (text: string) => void;

  /**
   * 文本框输入内容时调用此函数
   * (this function is called when the text box is input)
   * @param {EventObject} event
   */
  onInput?: (event: EventObject) => void;
}
