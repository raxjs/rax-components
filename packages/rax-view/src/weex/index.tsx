import { createElement, useRef, forwardRef, ForwardRefExoticComponent } from 'rax';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { ViewProps } from '../types';

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
    return <div {...rest} onAppear={handleAppear} ref={ref} className={className} style={style} />;
  }
);

export default wrapDefaultProperties(View);
