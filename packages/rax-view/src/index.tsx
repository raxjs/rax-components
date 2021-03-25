import { createElement, useRef, forwardRef, ForwardRefExoticComponent, RefAttributes, HTMLAttributes, MutableRefObject } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex, isMiniApp } from 'universal-env';
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
        // @ts-ignore
        {...rest} onAppear={onAppear} onDisappear={rest.onDisappear} onFirstAppear={onFirstAppear}
        // @ts-ignore
        ref={ref} className={`rax-view-v2 ${className}`} style={style} />;
    }
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

View.displayName = 'View';
export default View;
