import fmtEvent from './fmtEvent';

const noop = () => {};

Component({
  data: {
    styleSheet: '',
    isImage: false
  },
  // @ts-ignore
  props: {
    className: '',
    style: '',
    source: {
      uri: '',
      codePoint: ''
    },
    fontFamily: '',
    onClick: noop
  },
  deriveDataFromProps(nextProps) {
    this.initIcon(nextProps);
  },
  didMount() {
    if (!my.canIUse('component2')) {
      this.initIcon();
    }
  },
  didUpdate() {
    if (!my.canIUse('component2')) {
      this.initIcon();
    }
  },
  methods: {
    initIcon(nextProps) {
      const props = nextProps || this.props;
      const { uri, codePoint } = props.source || {};
      const { fontFamily, style = '' } = props;
      if (uri && !codePoint) {
        this.setData({
          isImage: true,
          styleSheet: style
        });
      } else {
        // loadFontFace only work for current page
        if (typeof my.loadFontFace === 'function') {
          my.loadFontFace({
            family: fontFamily,
            source: "url('" + uri + "')"
          });
        } else {
          console.warn('Your container may not support my.loadFontFace! Please check it and use local fontfamily.');
        }
        this.setData({
          styleSheet: {...style, fontFamily}
        });
      }
    },
    onTap(e) {
      const event = fmtEvent(this.props, e);
      if (this.props.onClick !== noop) {
        this.props.onClick(event);
      }
    },
  }
});
