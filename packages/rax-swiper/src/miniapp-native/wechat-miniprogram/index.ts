import fmtEvent from './fmtEvent';

Component({
  data: {
    current: 0,
    children: []
  },
  properties: {
    className: {
      type: String,
    },
    style: {
      type: String,
    },
    autoplay: {
      type: Boolean,
      value: false,
    },
    pagination: {
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
    initialSlide: {
      type: Number,
      value: 0,
    },
    paginationStyle: {
      type: Object,
      value: {
        itemColor: 'rgba(0, 0, 0, .3)',
        itemActiveColor: '#000000',
      },
    },
    interval: {
      type: Number,
      value: 3000
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
      current: this.properties.initialSlide,
    });
  },
  observers: {
    'initialSlide': function(nextIndex) {
      if (this.properties.initialSlide !== nextIndex && this.data.current !== nextIndex) {
        this.setData({
          current: nextIndex
        });
      }
    }
  },
  methods: {
    onChange(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onSlideChange', {
        activeIndex: event.detail.current,
        activeItemId: event.detail.currentItemId
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
    slideNext() {
      let current = this.data.current + 1;
      if (current >= this.data.__length) {
        if (this.properties.autoplay) {
          current = 0;
        } else {
          return;
        }
      }
      this.setData({
        current
      });
    },
    slidePrev() {
      let current = this.data.current - 1;
      if (current < 0) {
        if (this.properties.autoplay) {
          current = this.data.__length - 1;
        } else {
          return;
        }
      }
      
      this.setData({
        current
      });
    },
  },
});
