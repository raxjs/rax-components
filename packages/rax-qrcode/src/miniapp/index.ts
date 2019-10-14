import qr from 'qr.js';

function getStyleProps(key: string, styles: string) {
  if (styles === '') {
    return '';
  }
  const props = styles.split(';');
  let value = '';
  props.forEach(prop => {
    const [propKey, propValue] = prop.split(':');
    if (propKey == key) {
      value = propValue;
    }
  });
  return value;
}
function getStyleNumber(styleProp: string) {
  const rpxEndIndex = styleProp.indexOf('rpx');
  if (rpxEndIndex > 0) {
    return styleProp.substring(0, rpxEndIndex);
  } else {
    const pxEndIndex = styleProp.indexOf('px');
    if (pxEndIndex > 0) {
      return styleProp.substring(0, pxEndIndex);
    } else {
      return '';
    }
  }
}
Component({
  onInit() {
    this.randomId = Math.random()
      .toString()
      .substr(2);
    this.setData({ randomId: this.randomId });
  },
  data: {
    randomId: 'qrid'
  },
  props: {
    className: '',
    style: '',
    data: ''
  },
  didMount() {
    const { data = '', options = {}, width, heigth, style = {} } = this.props;
    if (data === '') {
      return;
    }
    this.width = width || getStyleNumber(getStyleProps('width', style)) || 300;
    this.height =
      heigth || getStyleNumber(getStyleProps('height', style)) || 300;
    this.drawCode(data, options);
  },
  methods: {
    drawCode(data, options) {
      const codeData = qr(data, options);
      const { fillColor = '#000000', blankColor = '#ffffff' } = options;
      const cells = codeData.modules;
      const tileWidth = this.width / cells.length;
      const tileHeight = this.height / cells.length;
      let ctx = my.createCanvasContext(this.randomId || 'qrid');
      for (let r = 0; r < cells.length; ++r) {
        const row = cells[r];
        for (let c = 0; c < row.length; ++c) {
          ctx.setFillStyle(row[c] ? fillColor : blankColor);
          const w = Math.ceil((c + 1) * tileWidth) - Math.floor(c * tileWidth);
          const h =
            Math.ceil((r + 1) * tileHeight) - Math.floor(r * tileHeight);
          ctx.fillRect(
            Math.round(c * tileWidth),
            Math.round(r * tileHeight),
            w,
            h
          );
        }
      }
      ctx.fill();
      ctx.draw();
    }
  }
});
