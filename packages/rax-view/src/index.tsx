import { createElement, useRef, forwardRef, ForwardRefExoticComponent, RefAttributes, HTMLAttributes, MutableRefObject, useEffect } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex, isMiniApp, isWeChatMiniProgram } from 'universal-env';
import './index.css';

export type ViewProps = RefAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;

interface ViewRef extends MutableRefObject<HTMLDivElement> {
  triggeredAppear: boolean;
}

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    const selfRef: ViewRef = useRef(null) as ViewRef;
    let { className, style, onFirstAppear, onAppear, ...rest } = props;
    if (isMiniApp) {
      // For miniapp runtime pre-compile
      return <view
       {...rest} onAppear={onAppear} onDisappear={rest.onDisappear} onFirstAppear={onFirstAppear}
       ref={ref} className={`rax-view-v2 ${className}`} style={style} />;
    }
    let handleAppear = onAppear;
    let _observer;
    if (isWeChatMiniProgram) {
      useEffect(() => {
        if (onAppear) {
          const customComponentInstance = document.getElementById(props.id);
          if (!customComponentInstance) {
            console.warn('id is required if using onAppear in wechat miniprogram!');
            return undefined;
          }
          //@ts-ignore
          _observer = customComponentInstance._internal.createIntersectionObserver();
          _observer
            .relativeToViewport()
            .observe('.rax-view-v2', res => {
              if (res.intersectionRatio > 0) {
                handleAppear && handleAppear(res);
              }
            });
          return () => {
            if (_observer) _observer.disconnect();
          }
        } else {
          return undefined;
        }
      }, []);
    }
    if (onFirstAppear) {
      handleAppear = (event) => {
        onAppear && onAppear(event);
        if (!selfRef.triggeredAppear) {
          onFirstAppear && onFirstAppear(event);
        } else {
          selfRef.triggeredAppear = true;
        }
      }
    }
    return <div {...rest} onAppear={handleAppear} ref={ref} className={cx( isWeex ? '' : 'rax-view-v2', className)} style={style} />;
  }
);

View.displayName = 'View';
export default View;
