import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { isWeex, isMiniApp } from 'universal-env';
import { TextProps } from './types';
import './index.css';

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
  if (isWeex) {
    return (
      <text
        {...rest}
        ref={ref}
        className={className}
        style={{ lines, ...style }}
        onClick={handleClick}
      >
        {textString}
      </text>
    );
  } else if (isMiniApp) {
    return (
      <text
        {...rest}
        ref={ref}
        className={`${prefixCls} ${className}`}
        style={{ lines, ...style }}
        onClick={handleClick}
        number-of-lines={lines}
      >
        {textString}
      </text>
    );
  } else {
    const classNames = [prefixCls, className];
    if (lines) {
      classNames.push(`${prefixCls}--overflow-hidden`);
      if (lines === 1) {
        classNames.push(`${prefixCls}--singleline`);
      } else {
        classNames.push(`${prefixCls}--multiline`);
      }
    }
    return (
      <span
        {...rest}
        ref={ref}
        className={classNames.join(' ')}
        // Vendor prefixes should begin with a capital letter.
        style={{ ...style, WebkitLineClamp: lines > 1 ? lines : undefined }}
        onClick={handleClick}
      >
        {textString}
      </span>
    );
  }
});
Text.displayName = 'Text';
export default Text;
