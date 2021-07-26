import { createElement, forwardRef, ForwardRefExoticComponent, useState, useMemo, memo } from 'rax';
import ScrollView from 'rax-scrollview';
import View from 'rax-view';

import { LegacyRefObject, RecyclerViewRefObject } from './types';

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

interface VirtualizedList extends ForwardRefExoticComponent<RecyclerViewRefObject> {
  Header?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
  Cell?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
  NestedList?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
}

function getVirtualizedList(SizeAndPositionManager): VirtualizedList {
  const VirtualizedList: VirtualizedList = forwardRef((props, ref) => {
    const { itemSize, horizontal, children, size, ...rest } = props;
    const length = children.length;
    const constantKey = getConstantKey(horizontal);
    const manager = useMemo(() => {
      return new SizeAndPositionManager({
        itemSize,
        horizontal,
        size,
        length
      });
    }, [itemSize, horizontal, length, size]);

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