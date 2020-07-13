import fmtEvent from './fmtEvent';

Component({
  data: {
    style: '',
    isImage: false,
    fontCache: {}
  },
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    source: {
      type: Object,
      value: {
        uri: '',
        codePoint: ''
      }
    },
    fontFamily: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached: function() {
      this.initIcon();
    }
  },
  observers: {
    styleSheet(newStyleSheet) {
      this.initIcon('styleSheet', newStyleSheet);
    },
    source(newSource) {
      this.initIcon('source', newSource);
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    initIcon(type, newValue) {
      if (type === 'styleSheet') {
        this.setData({
          style: newValue
        });
      } else {
        const { uri, codePoint } = newValue || this.properties.source || {};
        const { fontFamily, style = '' } = this.properties;
        if (uri && !codePoint && !fontFamily) {
          // use uri as image url
          this.setData({
            isImage: true,
            style
          });
          return;
        }
        if (!fontFamily) {
          // need't load font, just set style
          this.setData({
            style
          });
          return;
        }
        // load font and set style prop with new font-family
        const fontFile = this.data.fontCache[fontFamily];
        if (!fontFile) {
          this.data.fontCache[fontFamily] = uri;
          wx.loadFontFace({
            family: fontFamily,
            source: "url('" + uri + "')"
          });
        } else if (fontFile !== uri) {
          console.error(`font-family ${fontFamily} should be unique!`);
        }
        this.setData({
          style: `font-family:${fontFamily};${style}`
        });
      }
    },
    onTap(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event.detail);
    }
  }
});
