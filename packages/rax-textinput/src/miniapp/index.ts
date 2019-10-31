import fmtEvent from './fmtEvent';

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
    onBlur: () => {},
    onFocus: () => {},
    onChange: () => {},
    onChangeText: () => {},
    onInput: () => {}
  },
  didMount() {},
  methods: {
    onBlur(e) {
      const event = fmtEvent(this.props, e);
      this.props.onBlur(event);
    },
    onFocus(e) {
      const event = fmtEvent(this.props, e);
      this.props.onFocus(event);
    },
    onConfirm(e) {
      const event = fmtEvent(this.props, e);
      this.props.onChange(event);
      this.props.onChangeText(event.detail.value);
    },
    onInput(e) {
      const event = fmtEvent(this.props, e);
      this.props.onInput(event);
    }
  }
});
