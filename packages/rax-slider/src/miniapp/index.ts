import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {
    current: 0,
  },
  props: {
    className: '',
    style: '',
    width: '',
    height: '',
    autoPlay: false,
    showsPagination: false,
    loop: false,
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
    });
  },
  methods: {
    onChange(e) {
      const event = fmtEvent(this.props, e);
      this.props.onChange(event);
    },
  },
  slideTo(index) {
    if (index !== undefined) {
      this.setData({
        current: index,
      });
    }
  },
});
