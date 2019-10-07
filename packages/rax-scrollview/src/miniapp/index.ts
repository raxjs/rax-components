import fmtEvent from './fmtEvent';

Component({
  data: {
    direction: 'vertical',
    scroll_top: 0,
    scroll_left: 0,
    defaultStyle: 'border:0 solid black;display:flex;align-content:flex-start;flex-shrink:0;box-sizing:border-box;',
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
      let { x = 0, y = 0 } = param || {};
      this.setData({ scroll_top: x, scroll_left: y });
    }
  }
});
