import { createElement, forwardRef, useState, useMemo, memo, Fragment, useRef, useEffect } from 'rax';
import ScrollView from 'rax-scrollview';
import View from 'rax-view';
import Children from 'rax-children';
import createIntersectionObserver from '@uni/intersection-observer';

import NoRecycleList from './NoRecycleList';
import throttle from './throttle';

import { VirtualizedList } from './types';
import SizeAndPositionManager from './SizeAndPositionManager';
import { isWeb } from '@uni/env';

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
    const { itemSize, horizontal, children, bufferSize, scrollEventThrottle = 50, ...rest } = props;
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
    const [renderedIndex, setRenderedIndex] = useState([0, 0]);
    const [placeholderSize, setPlaceholderSize] = useState([0, 0]);
    const [observer, setObserver] = useState(null);

    const manager: SizeAndPositionManager  = useMemo(() => {
      const manager: SizeAndPositionManager = new SizeAndPositionManager({
        itemSize,
        horizontal,
        bufferSize,
        length: cellLength,
      });
      const {
        startIndex,
        endIndex,
        front,
        back
      } = manager.calCurrent(offsetRef.current);
      setRenderedIndex([startIndex, endIndex]);
      setPlaceholderSize([front, back]);
      return manager;
    }, [itemSize, horizontal, cellLength, bufferSize]);

    function handleScroll(e) {
      const offset = e.nativeEvent.contentOffset[constantKey.contentOffset];
      offsetRef.current = offset;
      const {
        startIndex,
        endIndex,
        front,
        back
      } = manager.calCurrent(offsetRef.current);
      setRenderedIndex([startIndex, endIndex]);
      setPlaceholderSize([front, back]);
      props.onScroll && props.onScroll(e);
    }

    const scrollRef = useRef(handleScroll);
    useMemo(() => {
      scrollRef.current = handleScroll;
    }, [manager, props.onScroll]);

    const throttleScroll = useMemo(() => throttle((e) => scrollRef.current(e), scrollEventThrottle), [scrollEventThrottle]);

    function resetObservation() {
      observer && observer.disconnect();
    }

    function intiateScrollObserver() {
      const intersectionObserver = createIntersectionObserver({
        threshold: [0.1]
      });
      intersectionObserver.observe('#rax-recyclerview-back', () => {
        console.log('到底了');
      });
      intersectionObserver.observe('#rax-recyclerview-front', () => {
        console.log('到头了')
      });
      setObserver(intersectionObserver);
    }    

    useEffect(() =>  {
      resetObservation();
      intiateScrollObserver();
    }, [renderedIndex[1]])

    if (isWeb) {
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
            <div key="rax-recyclerview-front" style={{ [constantKey.placeholderStyle]: placeholderSize[0] + 'rpx' }} />
            {cells.slice(renderedIndex[0], renderedIndex[1] + 1)}
            <div id="rax-recyclerview-back" key="rax-recyclerview-back" style={{ [constantKey.placeholderStyle]: placeholderSize[1] + 'rpx' }} />
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
        {/* fix sticky by adding view */}
        <View>
          {headers}
          <View key="rax-recyclerview-front" style={{ [constantKey.placeholderStyle]: placeholderSize[0] + 'rpx' }} />
          {createArray(renderedIndex[0]).map((v, index) => <Fragment key={`pl_${index}`} />)}
          {cells.slice(renderedIndex[0], renderedIndex[1] + 1).map((child, index) => <Fragment key={`pl_${index + renderedIndex[0]}`}>{child}</Fragment>)}
          {createArray(cellLength - renderedIndex[1] - 1).map((v, index) => <Fragment key={`pl_${index + renderedIndex[1] + 1}`} />)}
          <View id="rax-recyclerview-back" key="rax-recyclerview-back" style={{ [constantKey.placeholderStyle]: placeholderSize[1] + 'rpx' }} />
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