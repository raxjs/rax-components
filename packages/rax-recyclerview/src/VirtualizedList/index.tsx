import { createElement, forwardRef, useState, useMemo, memo } from 'rax';
import ScrollView from 'rax-scrollview';
import View from 'rax-view';
import NoRecycleList from './NoRecycleList';

import { VirtualizedList } from './types';

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
    const { itemSize, horizontal, children, bufferSize, ...rest } = props;
    if (!itemSize) {
      return (<NoRecycleList {...props}>{children}</NoRecycleList>);
    }
    const length = children.length;
    const constantKey = getConstantKey(horizontal);
    const manager = useMemo(() => {
      return new SizeAndPositionManager({
        itemSize,
        horizontal,
        bufferSize,
        length
      });
    }, [itemSize, horizontal, length, bufferSize]);

    const [renderedIndex, setRenderedIndex] = useState(() => manager.getRenderedIndex(0));
    const {
      front,
      back
    } = manager.getPlaceholderSize(renderedIndex.startIndex, renderedIndex.endIndex);

    function handleScroll(e) {
      const offset = e.nativeEvent.contentOffset[constantKey.contentOffset];
      const newRenderedIndex = manager.getRenderedIndex(offset);
      setRenderedIndex(newRenderedIndex);

      props.onScroll && props.onScroll(e);
    }

    return (
      <ScrollView
        className={`rax-recylerview ${horizontal ? 'rax-recylerview-horizontal' : 'rax-recylerview-vertical'}`}
        ref={ref}
        {...rest}
        horizontal={horizontal}
        onScroll={handleScroll}
      >
        <View key="rax-recyclerview-front" style={{ [constantKey.placeholderStyle]: front }} />
        {children.slice(renderedIndex.startIndex, renderedIndex.endIndex + 1)}
        <View key="rax-recyclerview-back" style={{ [constantKey.placeholderStyle]: back }} />
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