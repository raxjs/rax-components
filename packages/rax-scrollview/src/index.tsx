import {
  createElement,
  CSSProperties,
  ForwardRefExoticComponent,
  forwardRef,
  useRef,
  useState,
  useImperativeHandle
} from 'rax';
import { isWeex, isWeb } from 'universal-env';
import View from 'rax-view';
import RefreshControl from 'rax-refreshcontrol';
import findDOMNode from 'rax-find-dom-node';
import cx from 'classnames';
import Timer from './timer';
import { ScrollViewProps } from './types';
import './index.css';

const DEFAULT_END_REACHED_THRESHOLD = 500;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
const FULL_WIDTH = 750;
const STYLE_NODE_ID = 'rax-scrollview-style';
const baseCls = 'rax-scrollview';

const ScrollView: ForwardRefExoticComponent<ScrollViewProps> = forwardRef(
  (props, ref) => {
    let {
      className,
      style,
      horizontal,
      contentContainerStyle,
      scrollEventThrottle,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      onEndReached,
      onEndReachedThreshold,
      onScroll,
      children
    } = props;
    const [loadmoreretry, setLoadmoreretry] = useState(0);
    const lastScrollDistance = useRef(0);
    const lastScrollContentSize = useRef(0);
    const scrollerNodeSize = useRef(0);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const contentContainerRef = useRef<HTMLDivElement>(null);
    const handleScroll = e => {
      if (isWeb) {
        if (props.onScroll) {
          e.nativeEvent = {
            get contentOffset() {
              return {
                x: e.target.scrollLeft,
                y: e.target.scrollTop
              };
            },
            get contentSize() {
              return {
                width: e.target.scrollWidth,
                height: e.target.scrollHeight
              };
            }
          };
          props.onScroll(e);
        }

        if (props.onEndReached) {
          const scrollerNode = scrollerRef.current;
          scrollerNodeSize.current = props.horizontal
            ? scrollerNode.offsetWidth
            : scrollerNode.offsetHeight;
          // NOTE：in iOS7/8 offsetHeight/Width is is inaccurate （ use scrollHeight/Width ）
          const scrollContentSize = props.horizontal
            ? scrollerNode.scrollWidth
            : scrollerNode.scrollHeight;
          const scrollDistance = props.horizontal
            ? scrollerNode.scrollLeft
            : scrollerNode.scrollTop;
          const isEndReached =
            scrollContentSize - scrollDistance - scrollerNodeSize.current <
            onEndReachedThreshold;

          const isScrollToEnd = scrollDistance > lastScrollDistance.current;
          const isLoadedMoreContent =
            scrollContentSize != lastScrollContentSize.current;

          if (isEndReached && isScrollToEnd && isLoadedMoreContent) {
            lastScrollContentSize.current = scrollContentSize;
            props.onEndReached(e);
          }

          lastScrollDistance.current = scrollDistance;
        }
      }
      if (isWeex) {
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
      }
    };
    useImperativeHandle(ref, () => ({
      _nativeNode: scrollerRef.current,
      resetScroll() {
        if (isWeb) {
          lastScrollContentSize.current = 0;
          lastScrollDistance.current = 0;
        } else {
          setLoadmoreretry(loadmoreretry + 1);
        }
      },
      scrollTo(options?: {
        x?: number;
        y?: number;
        animated?: boolean;
        duration?: number;
      }) {
        const { x = 0, y = 0, animated = true, duration = 400 } = options || {};

        if (isWeex) {
          const dom = __weex_require__('@weex-module/dom');
          const contentContainer = contentContainerRef.current;
          // 首屏多个scrollview需要自动滚动到某个默认选中的位置，但是可能内容还未渲染出（不存在contentContainer的情况）
          contentContainer &&
            dom.scrollToElement(contentContainer, {
              offset: x || y || 0,
              animated
            });
        } else {
          const pixelRatio = document.documentElement.clientWidth / FULL_WIDTH;
          const scrollView = scrollerRef.current;
          const scrollLeft = scrollView.scrollLeft;
          const scrollTop = scrollView.scrollTop;
          if (animated) {
            const timer = new Timer({
              duration,
              easing: 'easeOutSine',
              onRun: e => {
                if (x >= 0) {
                  scrollerRef.current.scrollLeft =
                    scrollLeft + e.percent * (x * pixelRatio - scrollLeft);
                }
                if (y >= 0) {
                  scrollerRef.current.scrollTop =
                    scrollTop + e.percent * (y * pixelRatio - scrollTop);
                }
              }
            });
            timer.run();
          } else {
            if (x >= 0) {
              scrollerRef.current.scrollLeft = pixelRatio * x;
            }

            if (y >= 0) {
              scrollerRef.current.scrollTop = pixelRatio * y;
            }
          }
        }
      },
      scrollIntoView(options: {
        id: string;
        animated?: boolean;
        duration?: number;
      }) {
        const { id, animated = true } = options || {};
        if (!id) {
          throw new Error('Params missing id.');
        }
        const node = findDOMNode(id);
        if (node) {
          if (isWeex) {
            const dom = __weex_require__('@weex-module/dom');
            dom.scrollToElement(node.ref, {
              animated
            });
          }
          if (isWeb) {
            // TODO: Support web scrollIntoView
          }
        }
      }
    }));

    // In weex must be int value
    onEndReachedThreshold =
      typeof onEndReachedThreshold === 'string'
        ? parseInt(onEndReachedThreshold, 10)
        : onEndReachedThreshold;
    if (style) {
      const childLayoutProps = ['alignItems', 'justifyContent'].filter(
        prop => style[prop] !== undefined
      );

      if (childLayoutProps.length !== 0) {
        console.warn(
          'ScrollView child layout (' +
            JSON.stringify(childLayoutProps) +
            ') must be applied through the contentContainerStyle prop.'
        );
      }
    }

    let refreshContainer: any = <View />;
    let contentChild: Rax.RaxNode = null;
    if (Array.isArray(children)) {
      contentChild = children.map(child => {
        if (
          typeof child === 'object' &&
          child !== null &&
          'type' in child &&
          child.type == RefreshControl
        ) {
          refreshContainer = child;
        }
        return child;
      });
    } else {
      contentChild = children;
    }

    const contentContainer = (
      <View
        ref={contentContainerRef}
        className={cx({
          [`${baseCls}-content-container-horizontal`]: horizontal,
          [`${baseCls}-webcontainer`]: !isWeex && !horizontal
        })}
        style={contentContainerStyle}
      >
        {contentChild}
      </View>
    );

    const scrollerStyle: CSSProperties = {
      ...style
    };
    const cls = cx(
      baseCls,
      `${baseCls}-${horizontal ? 'horizontal' : 'vertical'}`,
      className
    );
    let showsScrollIndicator = props.horizontal
      ? showsHorizontalScrollIndicator
      : showsVerticalScrollIndicator;

    if (isWeex) {
      return (
        <scroller
          {...props}
          ref={scrollerRef}
          className={cls}
          style={scrollerStyle}
          showScrollbar={showsScrollIndicator}
          onLoadmore={onEndReached}
          onScroll={onScroll ? handleScroll : null}
          loadmoreoffset={onEndReachedThreshold}
          loadmoreretry={loadmoreretry}
          scrollDirection={props.horizontal ? 'horizontal' : 'vertical'}
        >
          {refreshContainer}
          {contentContainer}
        </scroller>
      );
    } else {
      if (
        !showsScrollIndicator &&
        typeof document !== 'undefined' &&
        typeof document.getElementById === 'function' &&
        !document.getElementById(STYLE_NODE_ID)
      ) {
        let styleNode = document.createElement('style');
        styleNode.id = STYLE_NODE_ID;
        document.head.appendChild(styleNode);
        styleNode.innerHTML = `.${baseCls}::-webkit-scrollbar{display: none;}`;
      }

      scrollerStyle.WebkitOverflowScrolling = 'touch';
      scrollerStyle.overflow = 'scroll';
      const webProps = {
        ...props
      };
      delete webProps.onEndReachedThreshold;
      return (
        <View
          {...webProps}
          ref={scrollerRef}
          className={cls}
          style={scrollerStyle}
          onScroll={
            scrollEventThrottle
              ? throttle(handleScroll, scrollEventThrottle)
              : handleScroll
          }
        >
          {contentContainer}
        </View>
      );
    }
  }
);

ScrollView.defaultProps = {
  scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
  onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
  showsHorizontalScrollIndicator: true,
  showsVerticalScrollIndicator: true,
  className: 'rax-scrollview'
};
ScrollView.displayName = 'ScrollView';

function throttle(func: (...args: any[]) => void, wait: number) {
  let ctx: any;
  let args: any;
  let rtn: any;
  let timeoutID: number | NodeJS.Timeout;
  let last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled() {
    ctx = this;
    args = arguments;
    var delta = new Date().getTime() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };
}

export default ScrollView;
export * from './types';
