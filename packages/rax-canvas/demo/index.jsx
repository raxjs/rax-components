import { createElement, Component, render, createRef } from 'rax';
import Canvas from '../src/index';
import DU from "driver-universal"

class CanvasSample extends Component {
  constructor(props) {
    super(props);
    this.raxCanvasDemo = createRef();
  }
  componentDidMount() {
    const context = this.raxCanvasDemo.current.getContext();
    context.fillStyle = 'red';
    context.fillRect(0, 0, 100, 100);
  }

  render() {
    return <Canvas style={{
      width: 750,
      height: 750
    }} ref={this.raxCanvasDemo} />;
  }
}

render(<CanvasSample />, document.body, { driver: DU });