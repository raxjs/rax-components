import fmtEvent from './fmtEvent';

function noop() {}

Component({
  data: {},
  props: {
    className: '',
    style: '',
    multiline: false,
    autoFocus: false,
    editable: true,
    keyboardType: 'default',
    maxLength: '',
    placeholder: '',
    password: false,
    secureTextEntry: false,
    value: '',
    defaultValue: '',
    enableNative: true,
    confirmType: '',
    onBlur: noop,
    onFocus: noop,
    onChange: noop,
    onChangeText: noop,
    onInput: noop,
    onConfirm: noop
  },
  didMount() {},
  methods: {
    trigger(type, value) {
      this.props[type] !== noop && this.props[type](value);
    },
    onBlur(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onBlur', event);
      this.trigger('onChange', event);
      this.trigger('onChangeText', event.detail.value);
    },
    onFocus(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onFocus', event);
      this.trigger('onChange', event);
      this.trigger('onChangeText', event.detail.value);
    },
    onConfirm(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onConfirm', event);
    },
    onInput(e) {
      const event = fmtEvent(this.props, e);
      this.trigger('onInput', event);
      this.trigger('onChange', event);
      this.trigger('onChangeText', event.detail.value);
    }
  }
});
