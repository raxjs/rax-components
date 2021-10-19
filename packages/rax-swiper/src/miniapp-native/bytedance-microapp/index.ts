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
        itemColor: 'rgba(255, 255, 255, 0.5)',
        itemActiveColor: 'rgb(255, 80, 0)',
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
      current: this.properties.initialSlide,
    });
  },
  observers: {
    'initialSlide': function(nextIndex) {
      if (this.properties.initialSlide !== nextIndex) {
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
      const current = this.data.current + 1 >= this.data.__length ? 0 : this.data.current + 1;
      this.setData({
        current
      });
    },
    slidePrev() {
      const current = this.data.current - 1 >= 0 ? this.data.current - 1 : this.data.__length - 1;
      this.setData({
        current
      });
    },
  },
});
