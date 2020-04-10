import { createElement, Component, createRef } from 'rax';
import { isWeex } from 'universal-env';
import { enable, WeexBridge, Image as GImage } from '@gcanvas/core';
import { rpx2px } from 'universal-unit-tool';

import findDOMNode from 'rax-find-dom-node';

/**
 * process user input width/height in style
 * @param userInputDimension
 */
function processCanvasDimension(userInputDimension) {
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
  return 300; // Default value
}

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
      width: width !== undefined ? width : processCanvasDimension(style.width),
      height: height !== undefined ? height : processCanvasDimension(style.height),
    };

    if (isWeex) {
      return <gcanvas {...this.props} style={{
        ...style,
        ...customStyle
      }} ref={this.canvas} />;
    } else {
      return <canvas {...this.props} width={customStyle.width} height={customStyle.height} ref={this.canvas} />;
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
