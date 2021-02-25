import {
  createElement,
  CSSProperties,
  ForwardRefExoticComponent,
  forwardRef,
  useRef,
  useState,
  useImperativeHandle
} from 'rax';
import cx from 'classnames';
import { ScrollViewProps } from '../types';
import '../index.css';

const ANIMATION_DURATION = 400;
const baseCls = 'rax-scrollview';

const ScrollView: ForwardRefExoticComponent<ScrollViewProps> = forwardRef(
  (props, ref) => {
    let {
      className,
      style,
      horizontal,
      onEndReached,
      onScroll,
      children,
      disableScroll = false,
      onEndReachedThreshold
    } = props;
    const [scrollTop] = useState(0);
    const [scrollLeft] = useState(0);
    const [scrollWithAnimation, setScrollWithAnimation] = useState(false);
    const [scrollAnimationDuration, setScrollAnimationDuration] = useState(ANIMATION_DURATION);
    const [scrollIntoViewId] = useState(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const handleScroll = e => {
      if (onScroll) {
        e.nativeEvent = {
          get contentOffset() {
            return {
              x: e.detail.scrollLeft,
              y: e.detail.scrollTop
            };
          },
          get contentSize() {
            return {
              width: e.detail.scrollWidth,
              height: e.detail.scrollHeight
            };
          }
        };
        onScroll(e);
      }
    };
    useImperativeHandle(ref, () => ({
      _nativeNode: scrollerRef.current,
      resetScroll() {
        if (horizontal) {
          scrollerRef.current.setAttribute('scroll-left', '0');
        } else {
          scrollerRef.current.setAttribute('scroll-top', '0');
        }
      },
      scrollTo(options?: {
        x?: number;
        y?: number;
        animated?: boolean;
        duration?: number;
      }) {
        const { x = 0, y = 0, animated = true, duration = ANIMATION_DURATION } = options || {};
        
        // Scroll event caused by users can not change scroll-top or scroll-left, so here we add some slight random element to force update 
        if (horizontal) {
          scrollerRef.current.setAttribute('scroll-left', String(x));
        } else {
          scrollerRef.current.setAttribute('scroll-top', String(y));
        }
        setScrollWithAnimation(animated);
        setScrollAnimationDuration(duration);
      },
      scrollIntoView(options: {
        id: string;
        animated?: boolean;
        duration?: number;
      }) {
        const { id, animated = true, duration = ANIMATION_DURATION } = options || {};
        if (!id) {
          throw new Error('Params missing id.');
        }
        scrollerRef.current.setAttribute('scroll-into-view', id);
        setScrollWithAnimation(animated);
        setScrollAnimationDuration(duration);
      }
    }));

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

    return (
      <scroll-view
        {...props}
        ref={scrollerRef}
        className={cls}
        style={scrollerStyle}
        scroll-top={scrollTop}
        scroll-left={scrollLeft}
        onScroll={onScroll ? handleScroll : null}
        onScrollToLower={onEndReached}
        lower-threshold={onEndReachedThreshold}
        scroll-with-animation={scrollWithAnimation}
        scroll-animation-duration={scrollAnimationDuration}
        scroll-x={!disableScroll && horizontal}
        scroll-y={!disableScroll && !horizontal}
        scroll-into-view={scrollIntoViewId}
      >
        {children}
      </scroll-view>
    );
  }
);

export default ScrollView;
