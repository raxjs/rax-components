import { createElement, forwardRef, useState, useMemo, memo, Fragment, useRef, useLayoutEffect } from 'rax';
import ScrollView from 'rax-scrollview';
import View from 'rax-view';
import Children from 'rax-children';
import findDOMNode from 'rax-find-dom-node';

import NoRecycleList from './NoRecycleList';
import throttle from './throttle';

import { VirtualizedList } from './types';
import SizeAndPositionManager from './SizeAndPositionManager';
import { isWeChatMiniProgram, isWeb } from '@uni/env';

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
      style: 'width'
    };
  }
  return {
    contentOffset: 'y',
    style: 'height'
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
    const { itemSize, itemEstimateSize, horizontal, children, bufferSize, scrollEventThrottle = 50, ...rest } = props;
    if (!itemSize && (!isWeb || !itemEstimateSize)) {
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
    const preNodeRef = useRef(null);

    const constantKey = getConstantKey(horizontal);
    const [renderInfo, setRenderInfo] = useState({
      placeholderSizes: [0, 0],
      renderedIndexs: [0, 0],
      pageIndexs: [0, 0]
    });

    const manager: SizeAndPositionManager = useMemo(() => {
      const manager: SizeAndPositionManager = new SizeAndPositionManager({
        itemSize,
        horizontal,
        bufferSize,
        itemEstimateSize,
        length: cellLength,
      });
      const result = manager.calCurrent(offsetRef.current);
      if (result) {
        const {
          renderedIndexs,
          placeholderSizes,
          pageIndexs
        } = result;
        setRenderInfo({
          renderedIndexs,
          placeholderSizes,
          pageIndexs
        });
      }

      return manager;
    }, [itemSize, horizontal, cellLength, bufferSize, itemEstimateSize]);

    function handleScroll(e) {
      const offset = e.nativeEvent.contentOffset[constantKey.contentOffset];
      offsetRef.current = offset;
      const result = manager.calCurrent(offsetRef.current);
      if (result) {
        const {
          renderedIndexs,
          placeholderSizes,
          pageIndexs
        } = result;
        setRenderInfo({
          renderedIndexs,
          placeholderSizes,
          pageIndexs
        });
      }
      props.onScroll && props.onScroll(e);
    }

    const scrollRef = useRef(handleScroll);
    useMemo(() => {
      scrollRef.current = handleScroll;
    }, [manager, props.onScroll]);

    const throttleScroll = useMemo(() => throttle((e) => scrollRef.current(e), scrollEventThrottle), [scrollEventThrottle]);

    useLayoutEffect(() => {
      if (isWeb) {
        manager.correctSize({
          targetNode: findDOMNode(preNodeRef.current),
          headerLength: headers.length,
          pageIndexs: renderInfo.pageIndexs as [number, number],
          styleString: constantKey.style
        });
      }
    }, [renderInfo.pageIndexs[0], renderInfo.pageIndexs[1]]);

    if (isWeChatMiniProgram) {
      return (
        <ScrollView
          className={`rax-recylerview ${horizontal ? 'rax-recylerview-horizontal' : 'rax-recylerview-vertical'}`}
          forwardRef={ref}
          {...rest}
          horizontal={horizontal}
          onScroll={throttleScroll}
          scroll-anchoring={true}
        >
          {/* fix sticky by adding view */}
          <View>
            {headers}
            <View key="rax-recyclerview-front" style={{ [constantKey.style]: renderInfo.placeholderSizes[0] + 'rpx' }} />
            {createArray(renderInfo.renderedIndexs[0]).map((v, index) => <Fragment key={`pl_${index}`} />)}
            {cells.slice(renderInfo.renderedIndexs[0], renderInfo.renderedIndexs[1] + 1).map((child, index) => <Fragment key={`pl_${index + renderInfo.renderedIndexs[0]}`}>{child}</Fragment>)}
            {createArray(cellLength - renderInfo.renderedIndexs[1] - 1).map((v, index) => <Fragment key={`pl_${index + renderInfo.renderedIndexs[1] + 1}`} />)}
            <View key="rax-recyclerview-back" style={{ [constantKey.style]: renderInfo.placeholderSizes[1] + 'rpx' }} />
          </View>
        </ScrollView>
      );
    }
    return (
      <ScrollView
        className={`rax-recylerview ${horizontal ? 'rax-recylerview-horizontal' : 'rax-recylerview-vertical'}`}
        forwardRef={ref}
        {...rest}
        horizontal={horizontal}
        onScroll={throttleScroll}
        scroll-anchoring={true}
      >
        {headers}
        <View ref={preNodeRef} key="rax-recyclerview-front" style={{ [constantKey.style]: renderInfo.placeholderSizes[0] + 'rpx' }} />
        {cells.slice(renderInfo.renderedIndexs[0], renderInfo.renderedIndexs[1] + 1)}
        <View key="rax-recyclerview-back" style={{ [constantKey.style]: renderInfo.placeholderSizes[1] + 'rpx' }} />
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