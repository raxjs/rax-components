import barCodes from '../barcodes';

function getStyleProps(key, styles) {
  let props = styles.split(';');
  let value = '';
  props.map((prop) => {
    let [propKey, propValue] = prop.split(':');
    if (propKey == key) {
      value = propValue;
    }
  });
  return value;
}
function getStyleNumber(styleProp) {
  let rpxEndIndex = styleProp.indexOf('rpx');
  if (rpxEndIndex > 0) {
    return styleProp.substring(0, rpxEndIndex);
  } else {
    let pxEndIndex = styleProp.indexOf('px');
    if (pxEndIndex > 0) {
      return styleProp.substring(0, pxEndIndex);
    } else {
      return '';
    }
  }
}
Component({
  onInit() {
    this.randomId = Math.random().toString().substr(2);
    this.setData({ randomId: this.randomId });
  },
  data: {
    randomId: 'qrid'
  },
  props: {
    className: '',
    style: '',
    data: '',
    type: 'CODE128',
    options: {}
  },
  didMount() {
    this.startChange();
  },
  didUpdate() {
    this.startChange();
  },
  methods: {
    drawCode(type, data, options) {
      const Encoder = barCodes[type];
      const barCodeData = new Encoder(data, options);
      const { fillColor = '#000000', barWidth = 2 } = options;
      let ctx = my.createCanvasContext(this.randomId || 'qrid');
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
      const { type, data, options, width, heigth, style } = this.props;
      if (data === '') {
        return;
      }
      let styleHeight = getStyleProps('height', style);
      let styleWidth = getStyleProps('width', style);
      this.width = width || getStyleNumber(styleWidth) || 300;
      this.height = heigth || getStyleNumber(styleHeight) || 300;
      this.drawCode(type, data, options);
    }
  }
});
