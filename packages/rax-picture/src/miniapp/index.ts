import fmtEvent from './fmtEvent';

Component({
  props: {
    className: '',
    style: '',
    source: {
      uri: ''
    },
    resizeMode: 'contain',
    lazyload: false,
    onClick: e => {},
    onLoad: e => {},
    onError: e => {}
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    onLoad(e) {
      const event = fmtEvent(this.props, e);
      this.props.onLoad(event);
    },
    onError(e) {
      const event = fmtEvent(this.props, e);
      this.props.onError(event);
    }
  }
});
