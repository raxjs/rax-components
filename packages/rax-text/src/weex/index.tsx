import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { TextProps } from '../types';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import '../index.css';

declare const __weex_v2__: any;

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

  /* global __weex_v2__ */
  if (typeof __weex_v2__ === 'object') {
    const classNames = [className];
    if (lines) {
      classNames.push(`${prefixCls}--overflow-hidden`);
      if (lines === 1) {
        classNames.push(`${prefixCls}--singleline`);
      } else {
        classNames.push(`${prefixCls}--multiline`);
      }
    }
    const lineClamp = lines > 1 ? lines : undefined;
    return (
      // @ts-ignore
      <text {...rest} ref={ref} className={classNames.join(' ')} style={{ ...style, lineClamp: lineClamp }} onClick={handleClick}>
        {textString}
      </text>
    );
  }
  return (
    // @ts-ignore
    <text {...rest} ref={ref} className={className} style={{ lines, ...style }} onClick={handleClick}>
      {textString}
    </text>
  );
});

export default wrapDefaultProperties(Text);
