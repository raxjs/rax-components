import fmtEvent from "./fmtEvent";

const noop = () => {};

Component({
  props: {
    className: "",
    style: "",
    endReachedThreshold: 500,
    onEndReached: noop,
    onScroll: noop,
    onTouchStart: noop,
    onTouchMove: noop,
    onTouchEnd: noop,
    onTouchCancel: noop
  },
  methods: {
    onEndReached(e) {
      const event = fmtEvent(this.props, e);
      this.props.onEndReached(event);
    },
    onScroll(e) {
      const event = fmtEvent(this.props, e);
      this.props.onScroll(event);
    },
    onTouchStart: function onTouchStart(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchStart(event);
    },
    onTouchMove: function onTouchMove(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchMove(event);
    },
    onTouchEnd: function onTouchEnd(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchEnd(event);
    },
    onTouchCancel: function onTouchCancel(e) {
      const event = fmtEvent(this.props, e);
      this.props.onTouchCancel(event);
    }
  }
});
