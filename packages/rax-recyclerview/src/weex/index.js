import {
  createElement,
  forwardRef,
  memo,
  useState,
  useRef,
  useImperativeHandle
} from 'rax';
import View from 'rax-view';
import findDOMNode from 'rax-find-dom-node';
import RefreshControl from 'rax-refreshcontrol';
import Children from 'rax-children';


const Cell = memo(
  forwardRef(({ className, style, ...rest }, ref) => {
    return (
      <cell {...rest} ref={ref} className={className} style={style} append="tree" />
    );
  })
);
Cell.displayName = 'Cell';

const Header = memo(
  forwardRef(({ className, style, ...rest }, ref) => {
    return (
      <header {...rest} ref={ref} className={className} style={style} append="tree" />
    );
  })
);
Header.displayName = 'Header';

const NestedList = memo(
  forwardRef(({ className, style, ...rest }, ref) => {
    return (
      <View {...rest} ref={ref} className={className} style={style} />
    );
  })
);
NestedList.displayName = 'NestedList';

const RecyclerView = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  const [loadmoreretry, setLoadmoreretry] = useState(0);
  const list = useRef(null);
  const firstNodePlaceholder = useRef(null);

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
    _nativeNode: list.current,
    resetScroll() {
      setLoadmoreretry(loadmoreretry + 1); // for weex 0.9-
      list.current.resetLoadmore && list.current.resetLoadmore(); // for weex 0.9+
    },
    scrollTo(options) {
      let x = parseInt(options.x);
      let y = parseInt(options.y);
      let animated =
        options && typeof options.animated !== 'undefined'
          ? options.animated
          : true;

      let dom = __weex_require__('@weex-module/dom');
      let firstNode = findDOMNode(firstNodePlaceholder.current);
      dom.scrollToElement(firstNode, {
        offset: x || y || 0,
        animated
      });
    }
  }));

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
  );
});

RecyclerView.Header = Header;
RecyclerView.Cell = Cell;
RecyclerView.NestedList = NestedList;
RecyclerView.displayName = 'RecyclerView';

export default RecyclerView;
