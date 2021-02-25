import {
  createElement,
  CSSProperties,
  ForwardRefExoticComponent,
  forwardRef,
  useRef,
  useState,
  useImperativeHandle
} from 'rax';
import View from 'rax-view';
import RefreshControl from 'rax-refreshcontrol';
import getElementById from 'rax-get-element-by-id';
import cx from 'classnames';
import { ScrollViewProps } from '../types';
import '../index.css';

const baseCls = 'rax-scrollview';

const ScrollView: ForwardRefExoticComponent<ScrollViewProps> = forwardRef(
  (props, ref) => {
    let {
      className,
      style,
      horizontal,
      contentContainerStyle,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      onEndReached,
      onEndReachedThreshold,
      onScroll,
      children
    } = props;
    const [loadmoreretry, setLoadmoreretry] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const contentContainerRef = useRef<HTMLDivElement>(null);
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
      onScroll(e);
    };
    useImperativeHandle(ref, () => ({
      _nativeNode: scrollerRef.current,
      resetScroll() {
        setLoadmoreretry(loadmoreretry + 1);
      },
      scrollTo(options?: {
        x?: number;
        y?: number;
        animated?: boolean;
        duration?: number;
      }) {
        const { x = 0, y = 0, animated = true } = options || {};

        const dom = __weex_require__('@weex-module/dom');
        const contentContainer = contentContainerRef.current;
        /**
         * Multiple scrollviews on the first screen need to be automatically scrolled to a default selected location,
         * but the content may not have been rendered (in the case of contentContainer)
         */
        contentContainer &&
          dom.scrollToElement(contentContainer, {
            offset: x || y || 0,
            animated
          });
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
        const node = getElementById(id);
        if (node) {
          const dom = __weex_require__('@weex-module/dom');
          dom.scrollToElement(node, {
            animated
          });
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
          return null;
        } else {
          return child;
        }
      });
    } else {
      contentChild = children;
    }

    const contentContainer = (
      <View
        ref={contentContainerRef}
        className={cx({
          [`${baseCls}-content-container-horizontal`]: horizontal
        })}
        style={contentContainerStyle}
      >
        {contentChild}
      </View>
    );

    const scrollerStyle: CSSProperties = {
      ...style
    };
    if (scrollerStyle.height === null) {
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
        scrollDirection={horizontal ? 'horizontal' : 'vertical'}
      >
        {refreshContainer}
        {contentContainer}
      </scroller>
    );
  }
);

export default ScrollView;
