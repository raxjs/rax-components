import fmtEvent from './fmtEvent';

Component({
  data: {
    direction: 'vertical',
    scroll_top: 0,
    scroll_left: 0,
    scroll_into_view: '',
    scroll_with_animation: false
  },
  props: {
    className: '',
    style: '',
    horizontal: false,
    endReachedThreshold: 500,
    onEndReached: () => { },
    onScroll: () => { },
    scrollTop: 0,
    scrollLeft: 0,
    ref: () => { }
  },
  didMount() {
  },
  methods: {
    onEndReached(e) {
      const event = fmtEvent(this.props, e);
      this.props.onEndReached(event);
    },
    onScroll(e) {
      const event = fmtEvent(this.props, e);
      event.nativeEvent = {
        get contentOffset() {
          return {
            x: e.detail.scrollLeft,
            y: e.detail.scrollTop
          };
        },
        get contentSize() {
          return {
            width: e.detail.scrollWidth,
            height: e.detail.scrollHeight
          };
        }
      };
      this.props.onScroll(event);
    },
    scrollTo(param) {
      let { x = 0, y = 0, animated = false } = param || {};
      this.setData({ scroll_top: y, scroll_left: x, scroll_with_animation: animated });
    },
    scrollIntoView(param) {
      const { id, animated = false } = param;
      this.setData({ scroll_into_view: id, scroll_with_animation: animated });
    }
  }
});
