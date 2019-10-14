import {createElement, Component, createRef} from 'rax';
import {isWeex} from 'universal-env';
import { enable, WeexBridge, Image as GImage } from 'gcanvas.js';

import findDOMNode from 'rax-find-dom-node';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = createRef();
  }
  getContext = (type = '2d') => {
    const canvas = findDOMNode(this.canvas.current);
    if (isWeex) {
      const gcanvas = enable(canvas, { bridge: WeexBridge, debug: false, disableAutoSwap: false, disableComboCommands: false });
      return gcanvas.getContext(type);
    } else {
      return canvas.getContext(type);
    }
  };

  render() {
    const {style = {}} = this.props;

    if (isWeex) {
      return <gcanvas {...this.props} ref={this.canvas} />;
    } else {
      return <canvas {...this.props} width={style.width} height={style.height} ref={this.canvas} />;
    }
  }
}

Canvas.createImage = () => {
  if (isWeex) {
    return new GImage();
  } else {
    return new Image();
  }
};

export default Canvas;
