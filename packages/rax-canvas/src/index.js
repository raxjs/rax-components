import { createElement, Component, createRef } from 'rax';
import { isWeex } from 'universal-env';
import { enable, WeexBridge, Image as GImage } from '@gcanvas/core';

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
    const { style = {}, width, height } = this.props;
    const customStyle = {
      width: width !== undefined ? width : style.width,
      height: height !== undefined ? height : style.height,
    };

    if (isWeex) {
      return <gcanvas {...this.props} style={{
        ...style,
        ...customStyle
      }} ref={this.canvas} />;
    } else {
      return <canvas {...this.props} width={parseInt(customStyle.width)} height={parseInt(customStyle.height)} ref={this.canvas} />;
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
