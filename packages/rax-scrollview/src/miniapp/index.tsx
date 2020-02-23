import {
  createElement,
  CSSProperties,
  ForwardRefExoticComponent,
  forwardRef,
  useRef,
  useState,
  useImperativeHandle
} from 'rax';
import { ScrollViewProps } from '../types';

const ANIMATION_DURATION = 400;

const ScrollView: ForwardRefExoticComponent<ScrollViewProps> = forwardRef(
  (props, ref) => {
    let {
      className,
      style,
      horizontal,
      onEndReached,
      onEndReachedThreshold = 50,
      onScroll,
      children,
      disableScroll = false
    } = props;
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollWithAnimation, setScrollWithAnimation] = useState(false);
    const [scrollAnimationDuration, setScrollAnimationDuration] = useState(ANIMATION_DURATION);
    const [scrollIntoViewId, setScrollIntoViewId] = useState(null);
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
          setScrollLeft(0);
        } else {
          setScrollTop(0);
        }
      },
      scrollTo(options?: {
        x?: number;
        y?: number;
        animated?: boolean;
        duration?: number;
      }) {
        const { x = 0, y = 0, animated = true, duration = ANIMATION_DURATION } = options || {};

        setScrollTop(y);
        setScrollLeft(x);
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
        setScrollIntoViewId(id);
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

    return (
      <scroll-view
        {...props}
        ref={scrollerRef}
        className={className}
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
