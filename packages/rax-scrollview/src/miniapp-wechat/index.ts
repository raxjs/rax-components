import fmtEvent from './fmtEvent';

Component({
  data: {
    direction: 'vertical',
    scrollTop: 0,
    scrollLeft: 0,
    scrollIntoView: '',
    scrollWithAnimation: true,
    scrollAnimationDuration: 400,
  },
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    disableScroll: {
      type: Boolean,
      value: false
    },
    horizontal: {
      type: Boolean,
      value: false
    },
    endReachedThreshold: {
      type: Number,
      value: 500
    },
    scrollTop: {
      type: Number,
      value: 0
    },
    scrollLeft: {
      type: Number,
      value: 0
    }
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  methods: {
    onEndReached(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onEndReached', event);
    },
    onScroll(e) {
      const event = fmtEvent(this.properties, e);
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
      this.triggerEvent('onScroll', event);
    },
    scrollTo(param) {
      const { x = 0, y = 0, animated = true, duration = 400 } = param || {};
      this.setData({
        scrollTop: y,
        scrollLeft: x,
        scrollWithAnimation: animated,
        scrollAnimationDuration: duration,
      });
    },
    scrollIntoView(param) {
      const { id, animated = true, duration = 400 } = param || {};
      this.setData({
        scrollIntoView: id,
        scrollWithAnimation: animated,
        scrollAnimationDuration: duration,
      });
    },
  },
});
