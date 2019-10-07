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
    //  window.__weex_tag_supports__('vslider')

    return <DefaultView
      {...commonProps}
      ref={this.content}
    />;
    // list View is not ready for 1.x
    // force vertical in list mode
    // return isWeex && useListView ? <ListView
    //   {...commonProps}
    //   loop={false}
    //   vertical={true}
    //   startGap={0}
    //   endGap={0}
    //   />
    //   : <DefaultView
    //     {...commonProps}
    //     ref={this.content}
    //   />;
  }
}

export default Slider;