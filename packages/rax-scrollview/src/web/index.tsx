import {
  createElement,
  CSSProperties,
  ForwardRefExoticComponent,
  forwardRef,
  useRef,
  useImperativeHandle
} from 'rax';
import View from 'rax-view';
import cx from 'classnames';
import Timer from '../timer';
import { ScrollViewProps } from '../types';
import throttle from '../throttle';
import '../index.css';

const FULL_WIDTH = 750;
const ANIMATION_DURATION = 400;
const STYLE_NODE_ID = 'rax-scrollview-style';
const baseCls = 'rax-scrollview';

/**
 * Scroll to some position method
 * @param scrollerRef the scroll container ref
 * @param x offset x
 * @param y offset y
 * @param animated does it need animated
 * @param duration animate duration
 */
function scrollTo(scrollerRef, x, y, animated, duration) {
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
            scrollLeft + e.percent * (x - scrollLeft);
        }
        if (y >= 0) {
          scrollerRef.current.scrollTop =
            scrollTop + e.percent * (y - scrollTop);
        }
      }
    });
    timer.run();
  } else {
    if (x >= 0) {
      scrollerRef.current.scrollLeft = x;
    }
    if (y >= 0) {
      scrollerRef.current.scrollTop = y;
    }
  }
}

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
    const lastScrollDistance = useRef(0);
    const lastScrollContentSize = useRef(0);
    const scrollerNodeSize = useRef(0);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const contentContainerRef = useRef<HTMLDivElement>(null);
    const handleScroll = e => {
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
        onScroll(e);
      }

      if (onEndReached) {
        const scrollerNode = scrollerRef.current;
        scrollerNodeSize.current = horizontal
          ? scrollerNode.offsetWidth
          : scrollerNode.offsetHeight;
        // NOTE：in iOS7/8 offsetHeight/Width is is inaccurate （ use scrollHeight/Width ）
        const scrollContentSize = horizontal
          ? scrollerNode.scrollWidth
          : scrollerNode.scrollHeight;
        const scrollDistance = horizontal
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
    };
    useImperativeHandle(ref, () => ({
      _nativeNode: scrollerRef.current,
      resetScroll() {
        lastScrollContentSize.current = 0;
        lastScrollDistance.current = 0;
      },
      scrollTo(options?: {
        x?: number;
        y?: number;
        animated?: boolean;
        duration?: number;
      }) {
        const { x = 0, y = 0, animated = true, duration = ANIMATION_DURATION } = options || {};
        const pixelRatio = document.documentElement.clientWidth / FULL_WIDTH;

        scrollTo(scrollerRef, x * pixelRatio, y * pixelRatio, animated, duration);
      },
      scrollIntoView(options?: {
        id?: string;
        animated?: boolean;
        duration?: number;
      }) {
        const { id, animated = true, duration = ANIMATION_DURATION } = options || {};
        if (!id) {
          throw new Error('Params missing id.');
        }
        const targetElement = document.getElementById(id);
        if (targetElement) {
          scrollTo(scrollerRef, targetElement.offsetLeft, targetElement.offsetTop, animated, duration);
        }
      }
    }));

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

    const contentContainer = (
      <View
        ref={contentContainerRef}
        className={cx({
          [`${baseCls}-content-container-horizontal`]: horizontal,
          [`${baseCls}-webcontainer`]: !horizontal
        })}
        style={contentContainerStyle}
      >
        {children}
      </View>
    );

    const scrollerStyle: CSSProperties = {
      ...style
    };

    if (scrollerStyle.height === null || scrollerStyle.height === undefined) {
      scrollerStyle.flex = 1;
    }
    const cls = cx(
      baseCls,
      `${baseCls}-${horizontal ? 'horizontal' : 'vertical'}`,
      className
    );
    let showsScrollIndicator = horizontal
      ? showsHorizontalScrollIndicator
      : showsVerticalScrollIndicator;
    {
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
      if (horizontal) {
        scrollerStyle.overflowX = 'scroll';
        scrollerStyle.overflowY = 'hidden';
      } else {
        scrollerStyle.overflowX = 'hidden';
        scrollerStyle.overflowY = 'scroll';
      }
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

export default ScrollView;
