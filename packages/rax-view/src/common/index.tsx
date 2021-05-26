import { createElement, useRef, forwardRef, ForwardRefExoticComponent, MutableRefObject } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex } from 'universal-env';
import wrapper from '../utils/wrapper';
import { ViewProps } from '../types';
import '../index.css';


interface ViewRef extends MutableRefObject<HTMLDivElement> {
  triggeredAppear: boolean;
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

export default wrapper(View);
