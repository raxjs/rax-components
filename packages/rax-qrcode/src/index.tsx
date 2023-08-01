import { createElement, Component, createRef, RefObject } from 'rax';
import Canvas from 'rax-canvas';
import qr from 'qr.js';

enum ErrorCorrectLevelMap {
  L = 1,
  M = 0,
  Q = 3,
  H = 2,
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

const styles = {
  qrCode: {
    width: 300,
    height: 300,
  },
};

interface QRCodeState {
  canvasWidth: number;
  canvasHeight: number;
}

class QRCode extends Component<QRCodeProps, QRCodeState> {
  public width = 0;
  public height = 0;
  private canvas: RefObject<HTMLCanvasElement>;

  state: QRCodeState = {
    canvasWidth: 0,
    canvasHeight: 0,
  };

  public constructor(props) {
    super(props);
    const { style = {} } = props;
    const { width = 300, height = 300 } = style;
    this.width = width;
    this.height = height;
    this.canvas = createRef<HTMLCanvasElement>();
  }

  public initCanvasLayoutAndDraw(data: string, options: QRCodeOptions) {
    // @ts-expect-error
    const canvasNode = this.canvas.current.canvas.current;

    if (!canvasNode) return;

    if (
      canvasNode.width !== 0 &&
      canvasNode.height !== 0 &&
      canvasNode.width === this.state.canvasWidth &&
      canvasNode.height === this.state.canvasHeight
    ) {
      this.drawCode(data, options);
    } else {
      const { width, height } = canvasNode.getBoundingClientRect();
      this.setState(
        {
          canvasWidth: width,
          canvasHeight: height,
        },
        () => {
          console.log(this.state);
          this.drawCode(data, options);
        }
      );
    }
  }

  public componentDidMount() {
    const { data = '', options = {} } = this.props;

    this.initCanvasLayoutAndDraw(data, options);
  }

  public componentWillReceiveProps(nextProps: QRCodeProps) {
    const { data, options = {} } = nextProps;

    if (data !== this.props.data) {
      this.initCanvasLayoutAndDraw(data, options);
    }
  }

  private drawCode = (data: string, options: QRCodeOptions) => {
    if (data === '') {
      return;
    }
    const opt = Object.assign(options, {
      errorCorrectLevel: ErrorCorrectLevelMap[options.errorCorrectLevel || 'H'],
    });
    const codeData = qr(data, opt);
    const { fillColor = '#000000', blankColor = '#ffffff' } = options;
    const cells = codeData.modules;
    const tileWidth = this.width / cells.length;
    const tileHeight = this.height / cells.length;
    const ctx = this.canvas.current?.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
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
    return (
      <Canvas
        width={this.state.canvasWidth}
        height={this.state.canvasHeight}
        style={{ ...styles.qrCode, ...style }}
        ref={this.canvas}
      />
    );
  }
}

export default QRCode;
