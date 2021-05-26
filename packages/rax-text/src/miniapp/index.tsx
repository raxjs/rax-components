import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { TextProps } from '../types';
import wrapper from '../utils/wrapper';
import '../index.css';

// add vesion in style to avoid conflict with older version
const prefixCls = 'rax-text-v2';
const Text: ForwardRefExoticComponent<TextProps> = forwardRef((props, ref) => {
  const {
    className,
    style,
    numberOfLines,
    children,
    onPress,
    onClick,
    ...rest
  } = props;
  const handleClick = onClick || onPress;
  const lines =
    typeof numberOfLines === 'string'
      ? parseInt(numberOfLines, 10)
      : numberOfLines;
  let textString = '';
  if (children != null) {
    textString = Array.isArray(children) ? children.join('') : children.toString();
  }
  return (
    // @ts-ignore
    <view {...rest} ref={ref} className={`${prefixCls} ${className}`} style={{ lines, ...style }} onClick={handleClick} number-of-lines={lines}
    >
      {textString}
    </view>
  );
});

export default wrapper(Text);
