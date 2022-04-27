import { createElement, useRef, forwardRef, ForwardRefExoticComponent } from 'rax';
import cx from 'classnames/dedupe';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { ViewProps } from '../types';
import '../index.css';

declare const __weex_v2__: any;

interface ViewRef {
  triggeredAppear: boolean;
}

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    const selfRef = useRef<ViewRef>(null);
    let { className, style, onFirstAppear, onAppear, ...rest } = props;

    let handleAppear = onAppear;
    if (onFirstAppear) {
      handleAppear = (event) => {
        onAppear && onAppear(event);
        if (!selfRef.current || !selfRef.current.triggeredAppear) {
          onFirstAppear && onFirstAppear(event);
          selfRef.current = {
            triggeredAppear: true
          };
        }
      };
    }
    /* global __weex_v2__ */
    const isWeexV2 = typeof __weex_v2__ === 'object';
    return <div {...rest} onAppear={handleAppear} ref={ref} className={cx(isWeexV2 ? 'rax-view-v2' : '', className)} style={style} />;
  }
);

export default wrapDefaultProperties(View);
