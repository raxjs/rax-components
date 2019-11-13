import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {
    styleSheet: ''
  },
  props: {
    className: '',
    style: '',
    source: {
      uri: ''
    },
    mode: 'scaleToFill',
    lazyLoad: false,
    onClick: noop,
    onLoad: noop,
    onError: noop
  },
  onInit() {
    this.initImage();
  },
  didMount() {
    if (!my.canIUse('component2')) {
      this.initImage();
    }
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    onLoad(e) {
      const event = fmtEvent(this.props, e);
      this.props.onLoad(event);
    },
    onError(e) {
      const event = fmtEvent(this.props, e);
      this.props.onError(event);
    },
    initImage() {
      const { width = null, height = null } = this.props.source || {};
      let style = this.props.style || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';

      this.setData({
        styleSheet: style
      });
    }
  }
});
