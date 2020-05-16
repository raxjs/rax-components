import * as Rax from 'rax';

/**
 * component: refresh-control(下拉刷新)
 * document address(文档地址)
 * https://alibaba.github.io/rax/component/refresh-control
 */

export interface RecyclerViewProps extends Rax.Attributes {

  /**
   * whether to show
   * (是否显示)
   */
  refreshing: boolean;
  /**
   * listen for drop-down refresh behavior, trigger when drop-down finish
   * (监听下拉刷新的行为，下拉完成时触发)
   * @param {WeexRefreshEvent} event
   */
  onRefresh?: (event: WeexRefreshEvent) => void;
  /**
   * listen for pullingdown event
   * （监听下拉事件）
   */
  onPullingdown?: (event: WeexPulldownEvent) => void;

  children?: Rax.RaxElement;
}

export interface WeexRefreshEvent {
  type: string;
}

/**
 * reference documents(参考文档)：https://weex.apache.org/cn/references/components/refresh.html
 */
export interface WeexPulldownEvent {

  /**
   * two times before and after the callback sliding distance difference
   * (前后两次回调滑动距离的差值)
   */
  dy: number;

  /**
   * drop-down distance
   * (下拉的距离)
   */
  pullingDistance: number;

  /**
   * refresh component height
   * (refresh 组件高度)
   */
  viewHeight: number;

  /**
   * constant string
   * (常数字符串)
   * example(例如)："pullingdown"
   */
  type: string;
}
