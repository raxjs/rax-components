import {
  createElement,
  useRef,
  useImperativeHandle
} from 'rax';
import cx from 'classnames';
import '../index.css';

const baseCls = 'rax-scrollview';

function scrollTo(scrollerRef, args) {
  const scrollView = scrollerRef.current;
  scrollView.scrollTo.apply(scrollView, args);
}

export default function renderWeexV2(props, ref) {
  let {
    className,
    style,
    horizontal,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    onEndReached,
    onEndReachedThreshold,
    onScroll,
    children
  } = props;
  const scrollerRef = useRef<HTMLDivElement>(null);
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
    },
    scrollTo(options?: {
      x?: number;
      y?: number;
      animated?: boolean;
      duration?: number;
    }) {
      const { x = 0, y = 0, animated = true, duration } = options || {};
      const args: any[] = [x, y, animated];
      if (duration) {
        args.push(duration);
      }
      scrollTo(scrollerRef, args);
    },
    scrollIntoView(options: {
      id: string;
      animated?: boolean;
      duration?: number;
    }) {
      const { id, animated = true, duration } = options || {};
      if (!id) {
        throw new Error('Params missing id.');
      }
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const args: any[] = [targetElement, animated];
        if (duration) {
          args.push(duration);
        }
        scrollTo(scrollerRef, args);
      }
    }
  }));

  // In weex must be int value
  onEndReachedThreshold =
    typeof onEndReachedThreshold === 'string'
      ? parseInt(onEndReachedThreshold, 10)
      : onEndReachedThreshold;

  const cls = cx(
    baseCls,
    `${baseCls}-${horizontal ? 'horizontal' : 'vertical'}`,
    className
  );
  let showsScrollIndicator = horizontal
    ? showsHorizontalScrollIndicator
    : showsVerticalScrollIndicator;

  const weexProps = { ...props, loadmoreoffset: onEndReachedThreshold };
  delete weexProps.onEndReachedThreshold;
  return (
    <scroller
      {...weexProps}
      className={cls}
      style={style}
      ref={scrollerRef}
      showScrollbar={showsScrollIndicator}
      onLoadmore={onEndReached}
      onScroll={onScroll ? handleScroll : null}
      loadmoreoffset={onEndReachedThreshold}
      scrollDirection={horizontal ? 'horizontal' : 'vertical'}
    >
      {children}
    </scroller>
  );
}
