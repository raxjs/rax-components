import { createElement, Component, createRef } from 'rax';
import Canvas from 'rax-canvas';
import qr from 'qr.js';

export enum ErrorCorrectLevel {
  L = 1,
  M = 0,
  Q = 3,
  H = 2
}

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

class QRCode extends Component<QRCodeProps, {}> {
  public width = 0;
  public height = 0;
  private canvas: Canvas | null = null;
  public static ErrorCorrectLevel = qr.ErrorCorrectLevel as ErrorCorrectLevel;

  public constructor(props) {
    super(props);
    const { style = {} } = props;
    const { width = 300, height = 300 } = style;
    this.width = width;
    this.height = height;
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
    const codeData = qr(data, options);
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
    return <Canvas style={{ ...styles.qrCode, ...style }} ref={this.canvas} />;
  }
}

const styles = {
  qrCode: {
    width: 300,
    height: 300
  }
};

export default QRCode;
