import { createElement, forwardRef, useState, useMemo, memo, Fragment } from 'rax';
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

const Cell = memo(
  forwardRef((props, ref) => {
    return (
      <View {...props} ref={ref} />
    );
  })
);
Cell.displayName = 'Cell';

const Header = memo(
  forwardRef((props, ref) => {
    return (
      <View {...props} ref={ref} />
    );
  })
);
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
    const flattenChildren = Children.toArray(children);
    const length = flattenChildren.length;
    const constantKey = getConstantKey(horizontal);
    const manager = useMemo(() => {
      return new SizeAndPositionManager({
        itemSize,
        horizontal,
        bufferSize,
        length,
        totalSize
      });
    }, [itemSize, horizontal, length, bufferSize]);
    const [renderedIndex, setRenderedIndex] = useState(() => manager.getRenderedIndex(0));
    const {
      front,
      back
    } = useMemo(() => {
      return manager.getPlaceholderSize(renderedIndex.startIndex, renderedIndex.endIndex);
    }, [renderedIndex.startIndex, renderedIndex.endIndex]);

    function handleScroll(e) {
      const offset = e.nativeEvent.contentOffset[constantKey.contentOffset];
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
        <View style={{
          [constantKey.placeholderStyle]: `${manager.totalSize}rpx`
        }}>
          <View key="rax-recyclerview-front" style={{ [constantKey.placeholderStyle]: front + 'rpx' }} />
          {createArray(renderedIndex.startIndex).map((v, index) => <Fragment key={`pl_${index}`}></Fragment>)}
          {flattenChildren.slice(renderedIndex.startIndex, renderedIndex.endIndex + 1).map((child, index) => <Fragment key={`pl_${index + renderedIndex.startIndex}`}>{child}</Fragment>)}
          {createArray(length - renderedIndex.endIndex - 1).map((v, index) => <Fragment key={`pl_${index + renderedIndex.endIndex + 1}`}></Fragment>)}
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