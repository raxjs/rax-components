import { createElement, forwardRef, useState, useMemo, memo, Fragment, useRef } from 'rax';
import ScrollView from 'rax-scrollview';
import View from 'rax-view';
import Children from 'rax-children';

import NoRecycleList from './NoRecycleList';
import throttle from './throttle';

import { VirtualizedList } from './types';

function createArray(length) {
  if (length > 0) {
    return new Array(length).fill(1);
  }
  return [];
}

function getConstantKey(horizontal: boolean) {
  if (horizontal) {
    return {
      contentOffset: 'x',
      placeholderStyle: 'width'
    };
  }
  return {
    contentOffset: 'y',
    placeholderStyle: 'height'
  };
}

const Cell = memo(({children}) => {
  return (<>{children}</>);
});
Cell.displayName = 'Cell';

const Header = memo(({children, ...rest}) => {
  return (<View {...rest}>{children}</View>);
});
Header.displayName = 'Header';

const NestedList = memo(
  forwardRef((props, ref) => {
    return (
      <View {...props} ref={ref} />
    );
  })
);
NestedList.displayName = 'NestedList';

function getVirtualizedList(SizeAndPositionManager): VirtualizedList {
  const VirtualizedList: VirtualizedList = forwardRef((props, ref) => {
    const { itemSize, horizontal, children, bufferSize, totalSize, scrollEventThrottle, ...rest } = props;
    if (!itemSize) {
      return (<NoRecycleList {...props}>{children}</NoRecycleList>);
    }
    const {
      headers,
      cells,
      cellLength
    } = useMemo(() => {
      const flattenChildren = Children.toArray(children);

      // header and cell must list in order
      let headerIndex = 0;
      for (let i = 0; i < flattenChildren.length; i ++) {
        if (flattenChildren[i].type !== Header) {
          break;
        }
        headerIndex++;
      }

      const headers = flattenChildren.slice(0, headerIndex);
      const cells = flattenChildren.slice(headerIndex);
      return {
        headers,
        cells,
        cellLength: cells.length
      };
    }, [children]);

    const offsetRef = useRef(0);

    const constantKey = getConstantKey(horizontal);
    const [renderedIndex, setRenderedIndex] = useState(SizeAndPositionManager.initRenderedIndex);

    const manager  = useMemo(() => {
      const manager = new SizeAndPositionManager({
        itemSize,
        horizontal,
        bufferSize,
        length: cellLength,
        totalSize
      });
      setRenderedIndex(manager.getRenderedIndex(offsetRef.current))
      return manager;
    }, [itemSize, horizontal, cellLength, bufferSize]);

    const {
      front,
      back
    } = useMemo(() => {
      return manager.getPlaceholderSize(renderedIndex.startIndex, renderedIndex.endIndex);
    }, [renderedIndex.startIndex, renderedIndex.endIndex]);

    function handleScroll(e) {
      const offset = e.nativeEvent.contentOffset[constantKey.contentOffset];
      offsetRef.current = offset;
      const newRenderedIndex = manager.getRenderedIndex(offset);
      setRenderedIndex(newRenderedIndex);
      props.onScroll && props.onScroll(e);
    }

    return (
      <ScrollView
        className={`rax-recylerview ${horizontal ? 'rax-recylerview-horizontal' : 'rax-recylerview-vertical'}`}
        forwardRef={ref}
        {...rest}
        horizontal={horizontal}
        onScroll={scrollEventThrottle ? throttle(handleScroll, scrollEventThrottle) : handleScroll}
        scroll-anchoring={true}
      >
        {/* fix sticky by adding view */}
        <View>
          {headers}
          <View key="rax-recyclerview-front" style={{ [constantKey.placeholderStyle]: front + 'rpx' }} />
          {createArray(renderedIndex.startIndex).map((v, index) => <Fragment key={`pl_${index}`} />)}
          {cells.slice(renderedIndex.startIndex, renderedIndex.endIndex + 1).map((child, index) => <Fragment key={`pl_${index + renderedIndex.startIndex}`}>{child}</Fragment>)}
          {createArray(cellLength - renderedIndex.endIndex - 1).map((v, index) => <Fragment key={`pl_${index + renderedIndex.endIndex + 1}`} />)}
          <View key="rax-recyclerview-back" style={{ [constantKey.placeholderStyle]: back + 'rpx' }} />
        </View>
      </ScrollView>
    );
  });

  VirtualizedList.Header = Header;
  VirtualizedList.Cell = Cell;
  VirtualizedList.NestedList = NestedList;
  VirtualizedList.displayName = 'RecyclerView';

  return VirtualizedList;
}

export default getVirtualizedList;