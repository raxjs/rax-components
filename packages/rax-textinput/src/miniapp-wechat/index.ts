import fmtEvent from './fmtEvent';

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
      value: 'text'
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
  attached() {
    const { value, defaultValue } = this.properties;
    this.setData({
      previousValue: value || defaultValue
    });
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
    }
  }
});
