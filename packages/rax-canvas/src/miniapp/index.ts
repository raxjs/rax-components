import fmtEvent from './fmtEvent';

const noop = function() {};

Component({
  props: {
    className: '',
    style: '',
    id: '',
    width: 0,
    height: 0,
    onClick: noop,
    onLongpress: noop,
    onTouchStart: noop,
    onTouchMove: noop,
    onTouchEnd: noop,
    onTouchCancel: noop
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    onLongpress(e) {
      const event = fmtEvent(this.props, e);
      this.props.onLongpress(event);
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
