Component({
  data: {
    styleSheet: '',
    isImage: false,
    fontCache: new Map()
  },
  // @ts-ignore
  props: {
    className: '',
    style: '',
    source: {
      uri: '',
      codePoint: ''
    },
    fontFamily: ''
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
        const fontFile = this.data.fontCache.get(fontFamily);
        if (!fontFile) {
          this.data.fontCache.set(fontFamily, uri);
          my.loadFontFace({
            family: fontFamily,
            source: "url('" + uri + "')"
          });
          this.setData({
            styleSheet: {...style, fontFamily}
          });
        } else if (fontFile !== uri) {
          console.error(`font-family ${fontFamily} should be unique!`);
        }
      }
    }
  }
});
