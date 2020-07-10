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
      if (uri && !codePoint && !fontFamily) {
        // use uri as image url
        this.setData({
          isImage: true,
          styleSheet: style
        });
        return;
      }
      if (!fontFamily) {
        // need't load font, just set style
        this.setData({
          styleSheet: style
        });
        return;
      }
      // load font and set style prop with new font-family
      if (typeof my.loadFontFace === 'function') {
        // loadFontFace only work for current page
        my.loadFontFace({
          family: fontFamily,
          source: "url('" + uri + "')"
        });
      } else {
        // some container (such as dingtalk's v1 engine) not support loadFontFace
        console.warn('Your container may not support my.loadFontFace! Please check it and use local fontfamily.');
      }
      // styleSheet receives string, and style is formated to string in compile stage.
      this.setData({
        styleSheet: `font-family:${fontFamily};${style}`
      });
    },
    onTap(e) {
      const event = fmtEvent(this.props, e);
      if (this.props.onClick !== noop) {
        this.props.onClick(event);
      }
    },
  }
});
