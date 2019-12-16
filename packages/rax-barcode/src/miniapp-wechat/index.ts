import barCodes from '../barcodes';
import { getStyleNumber, getStyleProps } from '../utils';

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
      const { type, data, options, styleSheet } = this.properties;
      if (data === '') {
        return;
      }
      let styleHeight = getStyleProps('height', styleSheet);
      let styleWidth = getStyleProps('width', styleSheet);
      this.width = getStyleNumber(styleWidth, SCREEN_WIDTH) || 300;
      this.height = getStyleNumber(styleHeight, SCREEN_WIDTH) || 300;
      this.drawCode(type, data, options);
    }
  }
});
