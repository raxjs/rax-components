import fmtEvent from "./fmtEvent";

const noop = () => {};

Component({
  props: {
    className: "",
    style: "",
    endReachedThreshold: 500,
    onEndReached: noop,
    onScroll: noop
  },
  methods: {
    onEndReached(e) {
      const event = fmtEvent(this.props, e);
      this.props.onEndReached(event);
    },
    onScroll(e) {
      const event = fmtEvent(this.props, e);
      this.props.onScroll(event);
    }
  }
});
