import barCodes from '../barcodes';

function trimString(str: string) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function getStyleProps(key: string, styles: string) {
  if (styles === '') {
    return '';
  }
  const props = styles.split(';');
  let value;
  props.forEach(prop => {
    const [propKey, propValue] = prop.split(':');
    if (trimString(propKey) === key) {
      value = propValue;
    }
  });
  return value;
}

function getStyleNumber(styleProp: string) {
  let rpxEndIndex = styleProp.indexOf('rpx');
  if (rpxEndIndex > 0) {
    return styleProp.substring(0, rpxEndIndex);
  } else {
    let pxEndIndex = styleProp.indexOf('px');
    if (pxEndIndex > 0) {
      return styleProp.substring(0, pxEndIndex);
    } else {
      return styleProp;
    }
  }
}
Component({
  data: {
    randomId: Math.random().toString().substr(2)
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
    data: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'CODE128'
    },
    options: {
      type: Object,
      value: {}
    }
  },
  observers: {
    'data': function() {
      // @ts-ignore
      this.startChange();
    }
  },
  methods: {
    drawCode(type, data, options) {
      const Encoder = barCodes[type];
      const barCodeData = new Encoder(data, options);
      const { fillColor = '#000000', barWidth = 2 } = options;
      let ctx = wx.createCanvasContext(this.data.randomId, this);
      const binary = barCodeData.encode().data;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.setFillStyle(fillColor);
      for (let i = 0; i < binary.length; i++) {
        const x = i * barWidth;
        if (binary[i] === '1') {
          ctx.fillRect(x, 0, barWidth, this.height);
        } else if (binary[i]) {
          ctx.fillRect(x, 0, barWidth, this.height * binary[i]);
        }
      }
      ctx.fill();
      ctx.draw();
    },
    startChange() {
      const { type, data, options, width, heigth, styleSheet } = this.properties;
      if (data === '') {
        return;
      }
      let styleHeight = getStyleProps('height', styleSheet);
      let styleWidth = getStyleProps('width', styleSheet);
      this.width = width || getStyleNumber(styleWidth) || 300;
      this.height = heigth || getStyleNumber(styleHeight) || 300;
      this.drawCode(type, data, options);
    }
  }
});
