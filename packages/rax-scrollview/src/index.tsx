import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram } from 'universal-env';
import ScrollViewMiniApp from './miniapp';
import ScrollViewWeb from './web';
import ScrollViewWeex from './weex';

const DEFAULT_END_REACHED_THRESHOLD = 500;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

let ScrollView = null;

if (isWeb) {
  ScrollView = ScrollViewWeb;
} else if (isMiniApp || isWeChatMiniProgram) {
  ScrollView = ScrollViewMiniApp;
} else if (isWeex) {
  ScrollView = ScrollViewWeex;
} else {
  ScrollView = ScrollViewWeb;
}

ScrollView.defaultProps = {
  scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
  onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
  showsHorizontalScrollIndicator: true,
  showsVerticalScrollIndicator: true,
  className: 'rax-scrollview'
};
ScrollView.displayName = 'ScrollView';

export default ScrollView;
export * from './types';


