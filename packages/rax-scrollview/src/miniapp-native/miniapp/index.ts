import fmtEvent from './fmtEvent';

declare const Component: any;

const noop = () => {};
Component({
  data: {
    direction: 'vertical',
    scrollY: 0,
    scrollX: 0,
    scrollIntoViewId: '',
    scrollWithAnimation: true,
    scrollAnimationDuration: 400
  },
  props: {
    id: '',
    className: '',
    style: '',
    disableScroll: false,
    horizontal: false,
    endReachedThreshold: 500,
    onEndReached: noop,
    onScroll: noop,
    scrollTop: 0,
    scrollLeft: 0,
    ref: noop,
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
      event.nativeEvent = {
        get contentOffset() {
          return {
            x: e.detail.scrollLeft,
            y: e.detail.scrollTop,
          };
        },
        get contentSize() {
          return {
            width: e.detail.scrollWidth,
            height: e.detail.scrollHeight,
          };
        },
      };
      this.props.onScroll(event);
    },
    scrollTo(param) {
      const { x = 0, y = 0, animated = true, duration = 400 } = param || {};
      this.setData({
        scrollY: y,
        scrollX: x,
        scrollWithAnimation: animated,
        scrollAnimationDuration: duration,
      });
    },
    scrollIntoView(param) {
      const { id, animated = true, duration = 400 } = param || {};
      this.setData({
        scrollIntoViewId: id,
        scrollWithAnimation: animated,
        scrollAnimationDuration: duration,
      });
    },
    onTouchStart: function onTouchStart(e) {
      const event = fmtEvent(this.props, e);
      event.nativeEvent = {
        get target() {
          return e.target;
        },
        get currentTarget() {
          return e.currentTarget;
        }
      };
      this.props.onTouchStart(event);
    },
    onTouchMove: function onTouchMove(e) {
      const event = fmtEvent(this.props, e);
      event.nativeEvent = {
        get target() {
          return e.target;
        },
        get currentTarget() {
          return e.currentTarget;
        }
      };
      this.props.onTouchMove(event);
    },
    onTouchEnd: function onTouchEnd(e) {
      const event = fmtEvent(this.props, e);
      event.nativeEvent = {
        get target() {
          return e.target;
        },
        get currentTarget() {
          return e.currentTarget;
        }
      };
      this.props.onTouchEnd(event);
    },
    onTouchCancel: function onTouchCancel(e) {
      const event = fmtEvent(this.props, e);
      event.nativeEvent = {
        get target() {
          return e.target;
        },
        get currentTarget() {
          return e.currentTarget;
        }
      };
      this.props.onTouchCancel(event);
    }
  },
});
