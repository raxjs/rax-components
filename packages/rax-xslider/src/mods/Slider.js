/** @jsx createElement */


'use strict';

import {createElement, Component, createRef} from 'rax';
import DefaultView from './views/DefaultView';
import {FULL_WIDTH} from './Constant';


const styles = {
  container: {
    overflow: 'hidden',
    width: FULL_WIDTH
  }
};


class Slider extends Component {
  constructor(props) {
    super(props);
    this.content = createRef();
  }

  switchTo(index, options, callback) {
    this.content.current.switchTo(index, options, callback);
  }

  render() {
    let {style = {}} = this.props;

    let commonProps = {
      ...this.props,
      style: {...styles.container, ...style},
      ref: 'content'
    };

    return <DefaultView
      {...commonProps}
      ref={this.content}
    />;
  }
}

export default Slider;