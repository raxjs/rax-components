import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {
    current: 0,
    duration: 0
  },
  props: {
    className: '',
    style: '',
    width: '',
    height: '',
    autoPlay: false,
    showsPagination: true,
    loop: true,
    index: 0,
    autoPlayInterval: 1000,
    direaction: 'horizontal',
    onChange: noop,
    paginationStyle: {
      itemColor: 'rgba(255, 255, 255, 0.5)',
      itemSelectedColor: 'rgb(255, 80, 0)',
    },
  },
  onInit() {
    this.setData({
      current: this.props.index,
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
        current: this.props.index,
      }, () => {
        this.setData({
          duration: 500
        });
      });
    }
  },
  didUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.setData({
        current: this.props.index
      });
    }
  },
  methods: {
    onChange(e) {
      const event = fmtEvent(this.props, e);
      this.props.onChange({
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
  },
});
