import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import cx from 'classnames/dedupe';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { ViewProps } from '../types';

import '../index.css';

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    let { className = '', style, onFirstAppear, onAppear, ...rest } = props;
    // For miniapp runtime pre-compile
    // @ts-ignore
    return <view {...rest} onAppear={onAppear} onDisappear={rest.onDisappear} onFirstAppear={onFirstAppear} ref={ref} className={cx('rax-view-v2', className)} style={style} />;
  }
);

export default wrapDefaultProperties(View);
