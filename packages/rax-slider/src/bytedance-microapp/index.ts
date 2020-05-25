import fmtEvent from './fmtEvent';

Component({
  data: {
    current: 0,
  },
  properties: {
    className: {
      type: String,
    },
    styleSheet: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    autoPlay: {
      type: Boolean,
      value: false,
    },
    showsPagination: {
      type: Boolean,
      value: false,
    },
    loop: {
      type: Boolean,
      value: true,
    },
    direaction: {
      type: String,
      value: 'horizontal',
    },
    index: {
      type: Number,
      value: 0,
    },
    autoPlayInterval: {
      type: Number,
      value: 1000,
    },
    paginationStyle: {
      type: Object,
      value: {
        itemColor: 'rgba(255, 255, 255, 0.5)',
        itemSelectedColor: 'rgb(255, 80, 0)',
      },
    },
  },
  attached() {
    this.setData({
      current: this.properties.index,
    });
  },
  observers: {
    'index': function(nextIndex) {
      if (this.properties.index !== nextIndex) {
        this.setData({
          index: nextIndex
        });
      }
    }
  },
  methods: {
    onChange(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onChange', {
        index: event.detail.current
      });
    },
    slideTo(index) {
      if (index !== undefined) {
        this.setData({
          current: index,
        });
      }
    },
    onAnimationFinish(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onAnimationFinish', {
        index: event.detail.current
      });
    },
    onTransition(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTransition', {
        index: event.detail.current
      });
    }
  },
});
