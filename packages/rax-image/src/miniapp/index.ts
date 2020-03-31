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
  deriveDataFromProps(nextProps) {
    this.initImage(nextProps);
  },
  didMount() {
    if (!my.canIUse('component2')) {
      this.initImage();
    }
  },
  didUpdate() {
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
    initImage(nextProps) {
      const props = nextProps || this.props;
      const { width = null, height = null } = props.source || {};
      let style = props.style || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';
      if (style == this.data.styleSheet) return;

      this.setData({
        styleSheet: style
      });
    }
  }
});
