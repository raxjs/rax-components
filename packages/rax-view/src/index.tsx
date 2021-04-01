import { createElement, useRef, forwardRef, ForwardRefExoticComponent, RefAttributes, HTMLAttributes, MutableRefObject, useEffect } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex, isMiniApp, isWeChatMiniProgram } from 'universal-env';
import './index.css';

export type ViewProps = RefAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;

interface ViewRef extends MutableRefObject<HTMLDivElement> {
  triggeredAppear: boolean;
  observer: {
    observe: Function;
    disconnect: Function;
  };
}

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    const selfRef: ViewRef = useRef(null) as ViewRef;
    let { className, style, onFirstAppear, onAppear, onDisappear, ...rest } = props;
    if (isMiniApp) {
      // For miniapp runtime pre-compile
      return <view
        {...rest} onAppear={onAppear} onDisappear={onDisappear} onFirstAppear={onFirstAppear}
        ref={ref} className={`rax-view-v2 ${className}`} style={style} />;
    }
    useEffect(() => {
      if (isWeChatMiniProgram) {
        const withAppear = typeof onAppear === 'function' || typeof onFirstAppear === 'function' || typeof onDisappear === 'function';
        if (!withAppear) {
          return undefined;
        }
        if (!props.id) {
          console.warn('id is required if using onAppear in wechat miniprogram!');
          return undefined;
        }

        const ele = document.getElementById(props.id);
        // @ts-ignore
        if (ele && ele._internal) {
          // @ts-ignore
          selfRef.observer = ele._internal.createIntersectionObserver().relativeToViewport();
          selfRef.observer.observe(`#${props.id}`, (res) => {
            const { intersectionRatio = 0 } = res;
            if (intersectionRatio > 0) {
              typeof onAppear === 'function' && onAppear(res);
              if (typeof onFirstAppear === 'function') {
                if (!selfRef.triggeredAppear) {
                  onFirstAppear(res);
                  selfRef.triggeredAppear = true;
                  const withFirstAppearOnly = typeof onFirstAppear === 'function' && typeof onAppear !== 'function' && typeof onDisappear !== 'function';
                  if (withFirstAppearOnly) {
                    selfRef.observer.disconnect();
                  }
                }
              }
            } else {
              typeof onDisappear === 'function' && onDisappear(res);
            }
          });
        }

        return () => {
          if (selfRef.observer) {
            selfRef.observer.disconnect();
          }
        };
      } else {
        return undefined;
      }
    }, [props.id, onAppear, onDisappear]);

    let handleAppear = onAppear;
    if (onFirstAppear) {
      handleAppear = (event) => {
        onAppear && onAppear(event);
        if (!selfRef.triggeredAppear) {
          onFirstAppear && onFirstAppear(event);
          selfRef.triggeredAppear = true;
        }
      };
    }
    return <div {...rest} onAppear={handleAppear} onDisappear={onDisappear} ref={ref} className={cx( isWeex ? '' : 'rax-view-v2', className)} style={style} />;
  }
);

View.displayName = 'View';
export default View;
