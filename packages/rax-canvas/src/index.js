import { createElement, Component, createRef } from 'rax';
import { isWeex } from 'universal-env';
import { enable, WeexBridge, Image as GImage } from '@gcanvas/core';
import { rpx2px, vw2px } from 'universal-unit-tool';

import findDOMNode from 'rax-find-dom-node';

/**
 * process user input width/height in style
 * @param userInputDimension
 */
function processCanvasDimension(userInputDimension) {
  if (typeof userInputDimension === 'number') {
    return rpx2px(userInputDimension);
  }
  if (typeof userInputDimension === 'string') {
    // number string e.g. '300'
    if (!isNaN(userInputDimension)) {
      return parseInt(userInputDimension);
    } else {
      const numberValue = parseInt(userInputDimension);
      // string endsWith rpx
      if (userInputDimension.endsWith('rpx')) {
        return rpx2px(numberValue);
      }
      // string endsWith vw
      if (userInputDimension.endsWith('vw')) {
        return vw2px(numberValue);
      }
      // string endsWith px
      if (userInputDimension.endsWith('px') ) {
        return numberValue;
      }
      // Other cases
      console.warn('width and height in style do not support units other than px, vw and rpx, please check it!');
      return userInputDimension;
    }
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
