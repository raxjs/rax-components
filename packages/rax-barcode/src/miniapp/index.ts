import barCodes from '../barcodes';
import { getStyleNumber, getStyleProps } from '../utils';

const SCREEN_WIDTH = my.getSystemInfoSync().screenWidth;

Component({
  //@ts-ignore
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
      const { type, data, options, style } = this.props;
      if (data === '') {
        return;
      }
      let styleHeight = getStyleProps('height', style);
      let styleWidth = getStyleProps('width', style);
      this.width = getStyleNumber(styleWidth, SCREEN_WIDTH) || 300;
      this.height = getStyleNumber(styleHeight, SCREEN_WIDTH) || 300;
      this.drawCode(type, data, options);
    }
  }
});
