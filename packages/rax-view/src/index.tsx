import { createElement, forwardRef, ForwardRefExoticComponent, RefAttributes, HTMLAttributes } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex, isMiniApp } from 'universal-env';
import './index.css';

export type ViewProps = RefAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    const { className, style, ...rest } = props;
    if (isMiniApp) {
      // For miniapp runtime pre-compile
      const { onAppear, onDisappear, onFirstAppear } = props;
      return <view
       {...rest} onAppear={onAppear} onDisappear={onDisappear} onFirstAppear={onFirstAppear}
       ref={ref} className={`rax-view ${className}`} style={style} />;
    }
    return <div {...rest} ref={ref} className={cx( isWeex ? '' : 'rax-view', className)} style={style} />;
  }
);

View.displayName = 'View';
export default View;
