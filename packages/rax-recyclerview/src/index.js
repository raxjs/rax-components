import {
  createElement,
  createContext,
  useContext,
  forwardRef,
  memo,
  useState,
  useRef,
  useImperativeHandle
} from 'rax';
import { isWeex } from 'universal-env';
import View from 'rax-view';
import findDOMNode from 'rax-find-dom-node';
import RefreshControl from 'rax-refreshcontrol';
import ScrollView from 'rax-scrollview';
import Children from 'rax-children';
import VirtualizedList from './VirtualizedList/index';

const Context = createContext(true);

const Cell = memo(
  forwardRef(({ className, style, ...rest }, ref) => {
    const isInARecyclerView = useContext(Context);
    return isWeex && isInARecyclerView ? (
      <cell {...rest} ref={ref} className={className} style={style} append="tree" />
    ) : (
      <View {...rest} ref={ref} className={className} style={style} />
    );
  })
);

const Header = memo(
  forwardRef(({ className, style, ...rest }, ref) => {
    const isInARecyclerView = useContext(Context);
    return isWeex && isInARecyclerView ? (
      <header {...rest} ref={ref} className={className} style={style} append="tree" />
    ) : (
      <View {...rest} ref={ref} className={className} style={style} />
    );
  })
);

const NestedList = memo(
  forwardRef(({ className, style, ...rest }, ref) => {
    const isInARecyclerView = useContext(Context);
    return !isWeex && isInARecyclerView ? (
      <VirtualizedList.NestedList {...rest} ref={ref} className={className} style={style} />
    ) : (
      <View {...rest} ref={ref} className={className} style={style} />
    );
  })
);

const RecyclerView = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  const [loadmoreretry, setLoadmoreretry] = useState(0);
  const scrollview = useRef(null);
  const list = useRef(null);
  const firstNodePlaceholder = useRef(null);
  const needRecycler = props.itemSize || props.nestedList ? true : false;

  const handleScroll = e => {
    e.nativeEvent = {
      contentOffset: {
        // HACK: weex scroll event value is opposite of web
        x: -e.contentOffset.x,
        y: -e.contentOffset.y
      },
      contentSize: e.contentSize
        ? {
          width: e.contentSize.width,
          height: e.contentSize.height
        }
        : null
    };
    props.onScroll(e);
  };


  useImperativeHandle(ref, () => ({
    _nativeNode: isWeex ? list.current : needRecycler ? scrollview.current : scrollview.current._nativeNode,
    resetScroll() {
      if (isWeex) {
        setLoadmoreretry(loadmoreretry + 1); // for weex 0.9-
        list.current.resetLoadmore && list.current.resetLoadmore(); // for weex 0.9+
      } else {
        scrollview.current.resetScroll();
      }
    },
    scrollTo(options) {
      let x = parseInt(options.x);
      let y = parseInt(options.y);
      let animated =
        options && typeof options.animated !== 'undefined'
          ? options.animated
          : true;

      if (isWeex) {
        let dom = __weex_require__('@weex-module/dom');
        let firstNode = findDOMNode(firstNodePlaceholder.current);
        dom.scrollToElement(firstNode, {
          offset: x || y || 0,
          animated
        });
      } else if (needRecycler) {
        scrollview.current.scrollTo(x || y, animated);
      } else {
        scrollview.current.scrollTo(options);
      }
    }
  }));

  if (isWeex) {
    let cells = Children.map(props.children, (child, index) => {
      if (child) {
        let hasOnRefresh =
              child.props && typeof child.props.onRefresh == 'function';
        if (
          props._autoWrapCell &&
              child.type != RefreshControl &&
              child.type != Header &&
              !hasOnRefresh
        ) {
          return <Cell>{child}</Cell>;
        } else {
          return child;
        }
      } else {
        return <Cell />;
      }
    });

    // add firstNodePlaceholder after refreshcontrol
    if (cells && cells.length) {
      let addIndex = cells[0].type == Cell || cells[0].type == Header ? 0 : 1;
      cells.splice(addIndex, 0, <Cell ref={firstNodePlaceholder} />);
    }

    return (
      <Context.Provider value={true}>
        <list
          {...rest}
          className={className}
          style={style}
          ref={list}
          onLoadmore={props.onEndReached}
          onScroll={props.onScroll ? handleScroll : null}
          loadmoreretry={loadmoreretry}
          loadmoreoffset={props.onEndReachedThreshold}
        >
          {cells}
        </list>
      </Context.Provider>
    );
  } else {
    if (needRecycler) {
      return (
          <VirtualizedList {...props} className={className} style={style} ref={scrollview} />
      );
    } else {
      return (
        <ScrollView {...props} className={className} style={style} ref={scrollview} />
      );
    }
  }
});

RecyclerView.Header = Header;
RecyclerView.Cell = Cell;
RecyclerView.NestedList = NestedList;

export default RecyclerView;
