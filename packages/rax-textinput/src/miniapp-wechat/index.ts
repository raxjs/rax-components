import fmtEvent from './fmtEvent';

Component({
  data: {},
  properties: {
    className: {
      type: String,
      value: ''
    },
    style: {
      type: String,
      value: ''
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
    }
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  attached() {
  },
  methods: {
    onBlur(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onblur', event);
    },
    onFocus(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onfocus', event);
    },
    onConfirm(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onchange', event);
      this.triggerEvent('onchangetext', event.detail.value);
    },
    onInput(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('oninput', event);
    }
  }
});
