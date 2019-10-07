import { PureComponent, createElement } from 'rax';
import PropTypes from 'rax-proptypes';
import BaseList from './BaseList';
import {
  SCROLL_CHANGE_REASON,
  scrollProp,
} from './constants';
import Timer from './timer';
import NestedList from './NestedList';
import throttle from './throttle';

export {DIRECTION as ScrollDirection} from './constants';

const STYLE_NODE_ID = 'rax-virtualized-list-style';
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
const DEFAULT_END_REACHED_THRESHOLD = 500;

const STYLE_WRAPPER = {
  overflow: 'auto',
  willChange: 'transform',
  WebkitOverflowScrolling: 'touch',
};

export default class VirtualizedList extends BaseList {
  lastScrollDistance = 0;
  lastScrollContentSize = 0;
  loadmoreretry = 1;

  static defaultProps = {
    width: '100%',
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    showsHorizontalScrollIndicator: true,
    showsVerticalScrollIndicator: true,
    className: 'rax-virtualized-list',
    nestedList: false,
  };

  static propTypes = {
    onScroll: PropTypes.func,
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    scrollEventThrottle: PropTypes.number,
    className: PropTypes.string,
    nestedList: PropTypes.bool,
  };

  rootNode;

  componentDidMount() {
    const { scrollOffset, scrollToIndex, scrollEventThrottle } = this.props;
    let handleScroll = this.handleScroll;

    if (scrollEventThrottle) {
      handleScroll = throttle(handleScroll, scrollEventThrottle);
    }
    this.rootNode.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    if (scrollOffset != null) {
      this.scrollTo(scrollOffset);
    } else if (scrollToIndex != null) {
      this.scrollTo(this.getOffsetForIndex(scrollToIndex));
    }
  }

  componentDidUpdate(_, prevState) {
    const {offset, scrollChangeReason} = this.state;

    if (
      prevState.offset !== offset &&
      scrollChangeReason === SCROLL_CHANGE_REASON.REQUESTED
    ) {
      this.scrollTo(offset);
    }
  }

  componentWillUnmount() {
    this.rootNode.removeEventListener('scroll', this.handleScroll);
  }

  scrollTo(value, animated) {
    if (animated) {
      const timer = new Timer({
        duration: 400,
        easing: 'easeOutSine',
        onRun: (e) => {
          if (value >= 0) {
            const currentValue = this.rootNode[scrollProp[this.scrollDirection]];
            this.rootNode[scrollProp[this.scrollDirection]] = currentValue + e.percent * (value / this.pixelRatio - currentValue);
          }
        }
      });
      timer.run();
    } else {
      this.rootNode[scrollProp[this.scrollDirection]] = value / this.pixelRatio;
    }
  }

  render() {
    const {
      children,
      style = {},
      width,
      horizontal,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      className,
      nestedList,
      ...props
    } = this.props;
    const { offset } = this.state;
    const wrapperStyle = {...STYLE_WRAPPER, ...style, width};

    let showsScrollIndicator = horizontal ? showsHorizontalScrollIndicator : showsVerticalScrollIndicator;

    if (!showsScrollIndicator && typeof document !== 'undefined' && !document.getElementById(STYLE_NODE_ID)) {
      let styleNode = document.createElement('style');
      styleNode.id = STYLE_NODE_ID;
      document.head.appendChild(styleNode);
      styleNode.innerHTML = `.${this.props.className}::-webkit-scrollbar{display: none;}`;
    }

    // return children when has nested list
    if (nestedList) {
      return (
        <div ref={this.getRef} style={wrapperStyle} className={className}>
          {children}
        </div>
      );
    }
    const { innerStyle, nodeItems } = this.getRenderProps({
      ...this.props,
      offset,
    });

    return (
      <div ref={this.getRef} style={wrapperStyle} className={className}>
        <div style={innerStyle}>{nodeItems}</div>
      </div>
    );
  }

  getRef = (node) => {
    this.rootNode = node;
  };

  resetScroll = () => {
    this.lastScrollContentSize = 0;
    this.lastScrollDistance = 0;
  }

  handleScroll = (event) => {
    const { onScroll, onEndReached, onEndReachedThreshold, totalSize, horizontal: isHorizontal, nestedList } = this.props;
    const offset = this.getNodeOffset();
    const realOffset = offset * this.pixelRatio;

    if (
      offset < 0 ||
      this.state.offset === realOffset ||
      event.target !== this.rootNode
    ) {
      return;
    }

    if (!nestedList) {
      this.setState({
        offset: realOffset,
        scrollChangeReason: SCROLL_CHANGE_REASON.OBSERVED,
      });
    }

    if (typeof onScroll === 'function') {
      onScroll(event, offset);
    }

    if (typeof onEndReached === 'function') {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, offsetWidth, offsetHeight } = this.rootNode;
      const scrollerNodeSize = isHorizontal ? offsetWidth : offsetHeight;
      const scrollContentSize = totalSize / this.pixelRatio || (isHorizontal ? scrollWidth : scrollHeight);
      const scrollDistance = isHorizontal ? scrollLeft : scrollTop;
      const isEndReached = scrollContentSize - scrollDistance - scrollerNodeSize < onEndReachedThreshold;

      const isScrollToEnd = scrollDistance > this.lastScrollDistance;
      const isLoadedMoreContent = scrollContentSize != this.lastScrollContentSize;

      if (isEndReached && isScrollToEnd && isLoadedMoreContent) {
        this.lastScrollContentSize = scrollContentSize;
        this.props.onEndReached();
      }
      this.lastScrollDistance = scrollDistance;
      window.dispatchEvent(new CustomEvent('recyclerViewEndReached'));
    }
    window.dispatchEvent(new CustomEvent('recyclerViewScroll', {
      detail: {
        offset: realOffset
      }
    }));
  };

  getNodeOffset() {
    return this.rootNode[scrollProp[this.scrollDirection]];
  }
}

VirtualizedList.NestedList = NestedList;
