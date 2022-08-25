import { createElement, PureComponent } from 'rax';
import PropTypes from 'prop-types';

import SizeAndPositionManager from './SizeAndPositionManager';

import {
  ALIGNMENT,
  DIRECTION,
  SCROLL_CHANGE_REASON,
  marginProp,
  oppositeMarginProp,
  positionProp,
  scrollProp,
  sizeProp,
} from './constants';

const DEFAULT_VIEWPORT = 750;

const STYLE_ITEM = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
};

const STYLE_STICKY_ITEM = {
  ...STYLE_ITEM,
  position: 'sticky',
};

const STYLE_INNER = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
};

const STYLE_WRAPPER = {
  overflow: 'auto',
  willChange: 'transform',
  WebkitOverflowScrolling: 'touch',
};

export default class BaseList extends PureComponent {
  pixelRatio = 1;
  styleCache = {};

  static defaultProps = {
    overscanCount: 3,
  };

  static propTypes = {
    estimatedItemSize: PropTypes.number,
    itemSize: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.func,
    ]).isRequired,
    overscanCount: PropTypes.number,
    scrollOffset: PropTypes.number,
    scrollToIndex: PropTypes.number,
    scrollToAlignment: PropTypes.oneOf([
      ALIGNMENT.AUTO,
      ALIGNMENT.START,
      ALIGNMENT.CENTER,
      ALIGNMENT.END,
    ]),
    horizontal: PropTypes.bool,
    stickyIndices: PropTypes.arrayOf(PropTypes.number),
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalSize: PropTypes.number,
  };

  state = {
    offset:
      this.props.scrollOffset ||
      this.props.scrollToIndex != null &&
        this.getOffsetForIndex(this.props.scrollToIndex) ||
      0,
    scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED,
  };

  pixelRatio = DEFAULT_VIEWPORT / this.getClientWidth();

  getEstimatedItemSize(props = this.props) {
    return (
      props.estimatedItemSize ||
      typeof props.itemSize === 'number' && props.itemSize ||
      50
    );
  }

  getSize(index, itemSize) {
    if (typeof itemSize === 'function') {
      return itemSize(index);
    }

    return Array.isArray(itemSize) ? itemSize[index] : itemSize;
  }

  getStyle(index, sticky) {
    const style = this.styleCache[index];

    if (style) {
      return style;
    }

    const {
      size,
      offset,
    } = this.sizeAndPositionManager.getSizeAndPositionForIndex(index);

    return this.styleCache[index] = sticky ? {
      ...STYLE_STICKY_ITEM,
      [sizeProp[this.scrollDirection]]: size,
      [marginProp[this.scrollDirection]]: offset,
      [oppositeMarginProp[this.scrollDirection]]: -(offset + size),
      zIndex: 1,
    } : {
      ...STYLE_ITEM,
      [sizeProp[this.scrollDirection]]: size,
      [positionProp[this.scrollDirection]]: offset,
    };
  }

  itemSizeGetter = (itemSize) => {
    return index => this.getSize(index, itemSize);
  };

  sizeAndPositionManager = new SizeAndPositionManager({
    itemCount: this.props.children.length,
    itemSizeGetter: this.itemSizeGetter(this.props.itemSize),
    estimatedItemSize: this.getEstimatedItemSize(),
  });
  scrollDirection = this.props.horizontal ? DIRECTION.HORIZONTAL : DIRECTION.VERTICAL;

  componentWillReceiveProps(nextProps) {
    const {
      estimatedItemSize,
      children,
      itemSize,
      scrollOffset,
      scrollToAlignment,
      scrollToIndex,
      horizontal,
      nestedList,
      active,
    } = this.props;
    const scrollPropsHaveChanged =
      nextProps.scrollToIndex !== scrollToIndex ||
      nextProps.scrollToAlignment !== scrollToAlignment;
    const nestedActiveChanged = nestedList && nextProps.active !== active;
    const itemPropsHaveChanged =
      nestedActiveChanged ||
      nextProps.children.length !== children.length ||
      nextProps.itemSize !== itemSize ||
      nextProps.estimatedItemSize !== estimatedItemSize;

    if (nextProps.itemSize !== itemSize) {
      this.sizeAndPositionManager.updateConfig({
        itemSizeGetter: this.itemSizeGetter(nextProps.itemSize),
      });
    }

    this.scrollDirection = horizontal ? DIRECTION.HORIZONTAL : DIRECTION.VERTICAL;
    if (
      nestedActiveChanged ||
      nextProps.children.length !== children.length ||
      nextProps.estimatedItemSize !== estimatedItemSize
    ) {
      this.sizeAndPositionManager.updateConfig({
        itemCount: nextProps.children.length,
        estimatedItemSize: this.getEstimatedItemSize(nextProps),
      });
    }

    if (itemPropsHaveChanged) {
      this.recomputeSizes();
    }

    if (nextProps.scrollOffset !== scrollOffset) {
      this.setState({
        offset: nextProps.scrollOffset || 0,
        scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED,
      });
    } else if (
      typeof nextProps.scrollToIndex === 'number' &&
      (scrollPropsHaveChanged || itemPropsHaveChanged)
    ) {
      this.setState({
        offset: this.getOffsetForIndex(
          nextProps.scrollToIndex,
          nextProps.scrollToAlignment,
          nextProps.children.length,
        ),
        scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED,
      });
    }
  }

  getOffsetForIndex(
    index,
    scrollToAlignment = this.props.scrollToAlignment,
    itemCount = this.props.children.length,
  ) {
    const {style = {}} = this.props;

    if (index < 0 || index >= itemCount) {
      index = 0;
    }

    return this.sizeAndPositionManager.getUpdatedOffsetForIndex({
      align: scrollToAlignment,
      containerSize: style[sizeProp[this.scrollDirection]],
      currentOffset: this.state && this.state.offset || 0,
      targetIndex: index,
    });
  }

  recomputeSizes(startIndex = 0) {
    this.styleCache = {};
    this.sizeAndPositionManager.resetItem(startIndex);
  }

  getClientWidth() {
    return document.documentElement.clientWidth;
  }

  getRenderProps(options) {
    const {
      style = {},
      offset,
      overscanCount,
      totalSize,
      stickyIndices,
      children,
      width,
    } = options;
    const items = [];
    const wrapperStyle = {...STYLE_WRAPPER, ...style, width};

    const { start, stop } = this.sizeAndPositionManager.getVisibleRange({
      containerSize: options[sizeProp[this.scrollDirection]] || style[sizeProp[this.scrollDirection]] || 0,
      offset,
      overscanCount,
    });
    const innerStyle = {
      ...STYLE_INNER,
      [sizeProp[this.scrollDirection]]: this.sizeAndPositionManager.getTotalSize(totalSize),
    };
    let renderChildren = [];

    if (stickyIndices != null && stickyIndices.length !== 0) {
      stickyIndices.forEach((index) => {
        const child = children[index];
        /**
         * child.props.style = newStyle cause: Uncaught TypeError: Cannot add property style, object is not extensible
         */
        items.push({
          ...child,
          props: {
            ...child.props,
            style: {
              ...child.props.style,
              ...this.getStyle(index, true)
            }
          }
        });
      });

      if (this.scrollDirection === DIRECTION.HORIZONTAL) {
        innerStyle.display = 'flex';
      }
    }

    /**
     * solve children is not an array.
     */
    if (typeof start !== 'undefined' && typeof stop !== 'undefined' && children) {
      let index = start;
      renderChildren = Array.isArray(children) ? children.slice(start, stop + 1) : [ children ];
      renderChildren.forEach((child) => {
        /**
         * child.props.style = newStyle cause: Uncaught TypeError: Cannot add property style, object is not extensible
         */
        items.push({
          ...child,
          props: {
            ...child.props,
            style: {
              ...child.props.style,
              ...this.getStyle(index, false)
            }
          }
        });
        index++;
      });
    }

    return {
      wrapperStyle,
      innerStyle,
      nodeItems: items,
    };
  }
}
