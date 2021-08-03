import { ForwardRefExoticComponent } from 'rax';
import { ScrollViewProps } from '../types';

const DEFAULT_END_REACHED_THRESHOLD = '500rpx';
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

export default function wrapDefaultProperties(ScrollView: ForwardRefExoticComponent<ScrollViewProps>): ForwardRefExoticComponent<ScrollViewProps> {
  ScrollView.defaultProps = {
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    endReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    showsHorizontalScrollIndicator: true,
    showsVerticalScrollIndicator: true,
    className: 'rax-scrollview'
  };
  ScrollView.displayName = 'ScrollView';
  return ScrollView;
}
