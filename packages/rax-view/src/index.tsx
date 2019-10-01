import { createElement, forwardRef, ForwardRefExoticComponent, RefAttributes, HTMLAttributes } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex } from 'universal-env';
import './index.css';

export type ViewProps = RefAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;

const View: ForwardRefExoticComponent<ViewProps> = forwardRef(
  (props, ref) => {
    const { className, style, ...rest } = props;
    return <div {...rest} ref={ref} className={cx( isWeex ? '' : 'rax-view', className)} style={style} />;
  }
);
export default View;
