import { createElement, Component, createRef } from 'rax';
import Canvas from 'rax-canvas';
import { rpx2px } from 'universal-unit-tool';
import qr from 'qr.js';

enum ErrorCorrectLevelMap {
  L = 1,
  M = 0,
  Q = 3,
  H = 2
}

type ErrorCorrectLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeOptions {
  errorCorrectLevel?: ErrorCorrectLevel;
  typeNumber?: number;
  blankColor?: string;
  fillColor?: string;
}
export interface QRCodeProps {
  data: string;
  options?: QRCodeOptions;
  style?: Rax.CSSProperties;
}

/**
 * process user input width/height in style
 * @param userInputDimension 
 */
function processDimension(userInputDimension: number|string): number|null {
  if (typeof userInputDimension === 'number') {
    return userInputDimension;
  }
  if (typeof userInputDimension === 'string') {
    const numberValue = parseInt(userInputDimension);
    if (userInputDimension.endsWith('rpx')) {
     return rpx2px(numberValue);
    }
    return numberValue;
  }
  return null;
}

class QRCode extends Component<QRCodeProps, {}> {
  public width = 0;
  public height = 0;
  private canvas: Canvas | null = null;

  public constructor(props) {
    super(props);
    const { style = {} } = props;
    const { width, height } = style;
    this.width = processDimension(width) || 300;
    this.height = processDimension(height) || 300;
    this.canvas = createRef();
  }

  public componentDidMount() {
    const { data = '', options = {} } = this.props;
    if (data !== '') {
      this.drawCode(data, options);
    }
  }

  public componentWillReceiveProps(nextProps: QRCodeProps) {
    const { data, options = {} } = nextProps;
    if (data !== this.props.data) {
      this.drawCode(data, options);
    }
  }

  private drawCode = (data: string, options: QRCodeOptions) => {
    const opt = Object.assign(options, {
      errorCorrectLevel: ErrorCorrectLevelMap[options.errorCorrectLevel || 'H']
    });
    const codeData = qr(data, opt);
    const { fillColor = '#000000', blankColor = '#ffffff' } = options;
    const cells = codeData.modules;
    const tileWidth = this.width / cells.length;
    const tileHeight = this.height / cells.length;
    const ctx = this.canvas.current.getContext();
    ctx.clearRect(0, 0, tileWidth, tileHeight);
    for (let r = 0; r < cells.length; ++r) {
      const row = cells[r];
      for (let c = 0; c < row.length; ++c) {
        ctx.fillStyle = row[c] ? fillColor : blankColor;
        const w = this.getSideLenOfRect(c, tileWidth);
        const h = this.getSideLenOfRect(r, tileHeight);
        ctx.fillRect(
          Math.round(c * tileWidth),
          Math.round(r * tileHeight),
          w,
          h
        );
      }
    }
  };

  private getSideLenOfRect(index: number, tileLen: number) {
    return Math.ceil((index + 1) * tileLen) - Math.floor(index * tileLen);
  }

  public render() {
    const { style } = this.props;
    const processedDimension = {
      width: this.width,
      height: this.height
    };
    return <Canvas style={{ ...processedDimension, ...style }} ref={this.canvas} />;
  }
}

export default QRCode;
