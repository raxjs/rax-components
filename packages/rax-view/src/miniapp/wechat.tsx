import { createElement, useRef, forwardRef, ForwardRefExoticComponent, MutableRefObject, useEffect } from 'rax';
import cx from 'classnames/dedupe';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { ViewProps } from '../types';

import '../index.css';

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
    let { className = '', style, onFirstAppear, onAppear, onDisappear, ...rest } = props;

    useEffect(() => {
      const withAppear = typeof onAppear === 'function' || typeof onFirstAppear === 'function' || typeof onDisappear === 'function';
      if (!withAppear) {
        return undefined;
      }
      if (!props.id) {
        console.warn('id is required if using onAppear in wechat miniprogram!');
        return undefined;
      }

      const ele = document.getElementById(props.id) as any;
      if (ele?._internal) {
        const observe = () => {
          selfRef.observer = ele._internal.createIntersectionObserver().relativeToViewport();
          selfRef.observer.observe(`#${props.id}`, (res) => {
            const { intersectionRatio = 0 } = res;
            if (intersectionRatio > 0) {
              typeof onAppear === 'function' && onAppear(res);
              if (typeof onFirstAppear === 'function') {
                if (!selfRef.triggeredAppear) {
                  onFirstAppear(res);
                  selfRef.triggeredAppear = true;
                  const withFirstAppearOnly = typeof onAppear !== 'function' && typeof onDisappear !== 'function';
                  if (withFirstAppearOnly) {
                    selfRef.observer.disconnect();
                  }
                }
              }
            } else {
              typeof onDisappear === 'function' && onDisappear(res);
            }
          });
          window.removeEventListener('setDataFinished', observe);
        }
        window.addEventListener('setDataFinished', observe);
      }

      return () => {
        if (selfRef.observer) {
          selfRef.observer.disconnect();
        }
      };
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
    return <div {...rest} onAppear={handleAppear} onDisappear={onDisappear} ref={ref} className={cx('rax-view-v2', className)} style={style} />;
  }
);

export default wrapDefaultProperties(View);
