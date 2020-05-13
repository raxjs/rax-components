import { createElement, Component, render, createRef } from 'rax';
import Canvas from 'rax-canvas';
import DriverUniversal from 'driver-universal';

class CanvasSample extends Component {
  constructor(props) {
    super(props);
    this.canvas = createRef();
  }
  componentDidMount() {
    const context = this.canvas.current.getContext();
    context.fillStyle = 'red';
    context.fillRect(0, 0, 300, 300);
  }
  render() {
    return <Canvas style={{
      width: '300rpx',
      height: '300rpx'
    }} ref={this.canvas} />;
  }
}

render(<CanvasSample />, document.body, { driver: DriverUniversal });
