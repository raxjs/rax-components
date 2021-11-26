import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {
    current: 0,
    duration: 0,
  },
  props: {
    className: '',
    style: '',
    autoplay: false,
    pagination: true,
    loop: true,
    initialSlide: 0,
    interval: 3000,
    direction: 'horizontal',
    onChange: noop,
    paginationStyle: {
      itemColor: 'rgba(0, 0, 0, .3)',
      itemActiveColor: '#000000',
    },
    children: [],
    __length: 0
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
    if (prevProps.initialSlide !== this.props.initialSlide && this.props.initialSlide !== this.data.current) {
      this.setData({
        current: this.props.initialSlide
      });
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
      let current = this.data.current + 1;
      if (current >= this.props.__length) {
        if (this.props.autoplay) {
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
        if (this.props.autoplay) {
          current = this.props.__length - 1;
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
