import { ForwardRefExoticComponent } from 'rax';
import { ScrollViewProps } from '../types';

const DEFAULT_END_REACHED_THRESHOLD = 500;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

export default function wrapper(scrollview: ForwardRefExoticComponent<ScrollViewProps>): ForwardRefExoticComponent<ScrollViewProps> {
  scrollview.defaultProps = {
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    showsHorizontalScrollIndicator: true,
    showsVerticalScrollIndicator: true,
    className: 'rax-scrollview'
  };
  scrollview.displayName = 'ScrollView';
  return scrollview;
}
