import fmtEvent from './fmtEvent';

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
    onClick: e => {},
    onLoad: e => {},
    onError: e => {}
  },
  onInit() {
    this.initImage();
  },
  didMount: function didMount() {
    if (!my.canIUse('component2')) {
      this.initImage();
    }
  },
  methods: {
    onClick: function onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    onLoad: function onLoad(e) {
      const event = fmtEvent(this.props, e);
      this.props.onLoad(event);
    },
    onError: function onError(e) {
      const event = fmtEvent(this.props, e);
      this.props.onError(event);
    },
    initImage: function initImage(e) {
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
