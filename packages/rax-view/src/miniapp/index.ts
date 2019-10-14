import fmtEvent from './fmtEvent';

Component({
  data: {},
  props: {
    className: '',
    style: '',
    onClick: e => {},
    onLongpress: e => {},
    onAppear: e => {},
    onDisAppear: e => {},
    onTouchStart: e => {},
    onTouchMove: e => {},
    onTouchEnd: e => {},
    onTouchCancel: e => {},
    animation: null
  },
  didMount() {},
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    onLongpress(e) {
      const event = fmtEvent(this.props, e);
      this.props.onLongpress(event);
    },
    onAppear(e) {
      const event = fmtEvent(this.props, e);
      this.props.onAppear(event);
    },
    onDisAppear(e) {
      const event = fmtEvent(this.props, e);
      this.props.onDisAppear(event);
    },
    onTouchStart(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchStart(event);
    },
    onTouchMove(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchMove(event);
    },
    onTouchEnd(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchEnd(event);
    },
    onTouchCancel(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchCancel(event);
    }
  }
});
