import fmtEvent from './fmtEvent';

const supportKeyboardTypes = [
  'text',
  'number',
  'idcard',
  'digit',
];
const defaultKeyboardType = 'text';

Component({
  data: {
    previousValue: ''
  },
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    placeholderColor: {
      type: String,
      value: '#999999'
    },
    multiline: {
      type: Boolean,
      value: false
    },
    autoFocus: {
      type: Boolean,
      value: false
    },
    editable: {
      type: Boolean,
      value: true
    },
    fixed: {
      type: Boolean,
      value: false
    },
    keyboardType: {
      type: String,
      value: defaultKeyboardType
    },
    maxLength: {
      type: Number,
      value: 140
    },
    placeholder: {
      type: String,
      value: ''
    },
    password: {
      type: Boolean,
      value: false
    },
    secureTextEntry: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    },
    defaultValue: {
      type: String,
      value: ''
    },
    confirmType: {
      type: String,
      value: ''
    },
    showCount: {
      type: Boolean,
      value: true
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Boolean,
      value: -1
    },
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  observers: {
    'keyboardType': function(value) {
      const { keyboardType } = this.properties;
      const preKeyboardType = this.getKeyboardType(keyboardType);
      const currentKeyboardType = this.getKeyboardType(value);

      if (preKeyboardType !== currentKeyboardType) {
        this.setData({
          keyboardType: currentKeyboardType,
        });
      }
    }
  },
  attached() {
    const { value, defaultValue, keyboardType } = this.properties;
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
  methods: {
    onBlur(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onBlur', event);
      if (event.detail.value !== this.data.previousValue) {
        this.triggerEvent('onChange', event);
        this.triggerEvent('onChangeText', event.detail.value);
        this.setData({
          previousValue: event.detail.value
        });
      }
    },
    onFocus(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onFocus', event);
    },
    onConfirm(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onConfirm', event);
    },
    onInput(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onInput', event);
    },
    getKeyboardType(keyboardType) {
      return supportKeyboardTypes.indexOf(keyboardType) !== -1 ?
        keyboardType : defaultKeyboardType;
    },
  }
});
