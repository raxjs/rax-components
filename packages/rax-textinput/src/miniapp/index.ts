import fmtEvent from './fmtEvent';

function noop() {}

const supportKeyboardTypes = [
  'text',
  'number',
  'idcard',
  'digit',
  'numberpad',
  'digitpad',
  'idcardpad',
];
const defaultKeyboardType = 'text';

Component({
  data: {
    previousValue: ''
  },
  props: {
    className: '',
    style: '',
    placeholderColor: '#999999',
    multiline: false,
    autoFocus: false,
    editable: true,
    keyboardType: defaultKeyboardType,
    maxLength: '',
    placeholder: '',
    password: false,
    secureTextEntry: false,
    value: '',
    defaultValue: '',
    enableNative: true,
    confirmType: '',
    showCount: true,
    randomNumber: false,
    selectionStart: -1,
    selectionEnd: -1,
    controlled: false,
    onBlur: noop,
    onFocus: noop,
    onChange: noop,
    onChangeText: noop,
    onInput: noop,
    onConfirm: noop
  },
  didMount() {
    const { value, defaultValue, keyboardType } = this.props;
    const currentKeyboardType = this.getKeyboardType(keyboardType);
    const data = {
      previousValue: value || defaultValue,
    };
    if (currentKeyboardType !== keyboardType) {
      Object.assign(data, {
        keyboardType: currentKeyboardType,
      });
    }
    this.setData(data);
  },
  didUpdate(preProps) {
    const preKeyboardType = this.getKeyboardType(preProps.keyboardType);
    const currentKeyboardType = this.getKeyboardType(this.props.keyboardType);

    if (preKeyboardType !== currentKeyboardType) {
      this.setData({
        keyboardType: currentKeyboardType,
      });
    }
  },
  methods: {
    trigger(type, value) {
      this.props[type] !== noop && this.props[type](value);
    },
    onBlur(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onBlur', event);
      if (event.detail.value !== this.data.previousValue) {
        this.trigger('onChange', event);
        this.trigger('onChangeText', event.detail.value);
        this.setData({
          previousValue: event.detail.value
        });
      }
    },
    onFocus(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onFocus', event);
    },
    onConfirm(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onConfirm', event);
    },
    onInput(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onInput', event);
    },
    getKeyboardType(keyboardType) {
      return supportKeyboardTypes.indexOf(keyboardType) !== -1 ?
        keyboardType : defaultKeyboardType;
    },
  }
});
