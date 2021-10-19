import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {
    current: 0,
    duration: 0,
    __length: 0
  },
  props: {
    className: '',
    style: '',
    autoplay: false,
    showsPagination: true,
    loop: true,
    initialSlide: 0,
    autoPlayInterval: 1000,
    direction: 'horizontal',
    onChange: noop,
    paginationStyle: {
      itemColor: 'rgba(255, 255, 255, 0.5)',
      itemActiveColor: 'rgb(255, 80, 0)',
    },
    children: []
  },
  onInit() {
    this.setData({
      current: this.props.initialSlide,
      duration: 500
    });
  },
  didMount() {
    if (!my.canIUse('component2')) {
      /**
       * The default duration is 500.
       * There should be no transition animation when the current is initialized,
       * so the initial duration is 0.
       * After initialization, the value is set to the default value.
       */
      this.setData({
        current: this.props.initialSlide,
      }, () => {
        this.setData({
          duration: 500
        });
      });
    }
  },
  didUpdate(prevProps) {
    const newData = Object.create(null);
    let changed = false;
    if (prevProps.initialSlide !== this.props.initialSlide) {
      newData.current = this.props.initialSlide;
      changed = true;
    }
    if (prevProps.children.length !== this.data.__length) {
      newData.__length = prevProps.children.length;
      changed = true;
    }
    if (changed) {
      this.setData(newData);
    }
  },
  methods: {
    onChange(e) {
      const event = fmtEvent(this.props, e);
      this.props.onChange({
        activeIndex: event.detail.current,
        activeItemId: event.detail.currentItemId
      });
      this.setData({
        current: event.detail.current
      });
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
