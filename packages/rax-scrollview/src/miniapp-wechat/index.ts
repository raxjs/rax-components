import fmtEvent from './fmtEvent';

Component({
  data: {
    direction: 'vertical',
    scroll_top: 0,
    scroll_left: 0,
    scroll_into_view: '',
    scroll_with_animation: true,
    scroll_animation_duration: 400,
  },
  properties: {
    className: {
      type: String,
      value: ''
    },
    style: {
      type: String,
      value: ''
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
        scroll_top: y,
        scroll_left: x,
        scroll_with_animation: animated,
        scroll_animation_duration: duration,
      });
    },
    scrollIntoView(param) {
      const { id, animated = true, duration = 400 } = param || {};
      this.setData({
        scroll_into_view: id,
        scroll_with_animation: animated,
        scroll_animation_duration: duration,
      });
    },
  },
});
