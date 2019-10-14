import { createElement } from 'rax';
import View from 'rax-view';
import BaseList from './BaseList';
import {
  SCROLL_CHANGE_REASON,
} from './constants';

let cacheOffset = 0;
export default class NestedList extends BaseList {
  state = {
    offset: 0,
  };

  componentDidMount() {
    window.addEventListener('recyclerViewScroll', this.handleScroll);
  }

  componentWillUnMount() {
    window.removeEventListener('recyclerViewScroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const { detail } = event;
    const { offset } = detail;
    const { active } = this.props;

    cacheOffset = offset;
    if (active) {
      this.setState({
        offset,
        scrollChangeReason: SCROLL_CHANGE_REASON.OBSERVED,
      });
    }
  }

  render() {
    const {
      className,
    } = this.props;

    const { innerStyle, nodeItems, wrapperStyle } = this.getRenderProps({
      ...this.props,
      offset: cacheOffset,
    });

    return (
      <View ref={this.getRef} style={wrapperStyle} className={className}>
        <View style={innerStyle}>{nodeItems}</View>
      </View>
    );
  }
}
