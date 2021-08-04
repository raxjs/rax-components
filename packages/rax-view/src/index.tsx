<<<<<<< HEAD
import { createElement, useRef, forwardRef, ForwardRefExoticComponent, MutableRefObject } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex } from 'universal-env';
import wrapDefaultProperties from './utils/wrapDefaultProperties';
import { ViewProps } from './types';
import './index.css';

interface ViewRef extends MutableRefObject<HTMLDivElement> {
  triggeredAppear: boolean;
=======
import { isMiniApp, isWeb, isWeChatMiniProgram } from 'universal-env';
import ViewCommon from './common';
import ViewAliMiniApp from './miniapp/ali';
import ViewWechatMiniProgram from './miniapp/wechat';

let View = null;

if (isWeb) {
  View = ViewCommon;
} else if (isMiniApp) {
  View = ViewAliMiniApp;
} else if (isWeChatMiniProgram) {
  View = ViewWechatMiniProgram;
} else {
  View = ViewCommon;
>>>>>>> master
}

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    const selfRef: ViewRef = useRef(null) as ViewRef;
    let { className, style, onFirstAppear, onAppear, ...rest } = props;

    let handleAppear = onAppear;
    if (onFirstAppear) {
      handleAppear = (event) => {
        onAppear && onAppear(event);
        if (!selfRef.triggeredAppear) {
          onFirstAppear && onFirstAppear(event);
        } else {
          selfRef.triggeredAppear = true;
        }
      };
    }
    return <div {...rest} onAppear={handleAppear} ref={ref} className={cx( isWeex ? '' : 'rax-view-v2', className)} style={style} />;
  }
);

export default wrapDefaultProperties(View);
