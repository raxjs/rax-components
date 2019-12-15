import qr from 'qr.js';
import { getStyleNumber, getStyleProps } from '../utils';

enum ErrorCorrectLevelMap {
  L = 1,
  M = 0,
  Q = 3,
  H = 2
}

const SCREEN_WIDTH = wx.getSystemInfoSync().screenWidth;

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
    options: {
      type: Object,
      value: {}
    }
  },
  attached() {
    const { data = '', options = {}, styleSheet = '' } = this.properties;
    if (data === '') {
      return;
    }
    this.width = getStyleNumber(getStyleProps('width', styleSheet), SCREEN_WIDTH) || 300;
    this.height = getStyleNumber(getStyleProps('height', styleSheet), SCREEN_WIDTH) || 300;
    this.drawCode(data, options);
  },
  methods: {
    drawCode(data, options) {
      const opt = Object.assign(options, {
        errorCorrectLevel: ErrorCorrectLevelMap[options.errorCorrectLevel || 'H']
      });
      const codeData = qr(data, opt);
      const { fillColor = '#000000', blankColor = '#ffffff' } = options;
      const cells = codeData.modules;
      const tileWidth = this.width / cells.length;
      const tileHeight = this.height / cells.length;
      let ctx = wx.createCanvasContext(this.data.randomId, this);
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
