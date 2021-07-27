import fmtEvent from './fmtEvent';

console.warn('组件所依赖的 rax-slider 版本较旧，请尽快重新构建发布该组件');
Component({
  data: {
    current: 0,
    children: []
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
      value: true,
    },
    loop: {
      type: Boolean,
      value: true,
    },
    direction: {
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
    __length: {
      type: Number,
      observer(newLength) {
        if (this.data.children.length !== newLength) {
          this.data.children.length = newLength;
          this.setData({
            children: this.data.children
          });
        }
      }
    }
  },
  options: {
    multipleSlots: true
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
      // Only setData by user touch action
      if (e.detail.source === 'touch') {
        this.setData({
          current: event.detail.current
        });
      }
    },
    slideTo(index) {
      if (index !== undefined) {
        this.setData({
          current: index,
        });
      }
    },
  },
});
