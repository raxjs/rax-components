import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { isWeex, isMiniApp, isWeChatMiniProgram } from 'universal-env';
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
        // @ts-ignore
        ref={ref}
        className={className}
        style={{ lines, ...style }}
        // @ts-ignore
        onClick={handleClick}
      >
        {textString}
      </text>
    );
  } else if (isMiniApp || isWeChatMiniProgram) {
    return (
      <text
        {...rest}
        // @ts-ignore
        ref={ref}
        className={`${prefixCls} ${className}`}
        style={{ lines, ...style }}
        // @ts-ignore
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
    const lineClamp = lines > 1 ? lines : undefined;
    return (
      <span
        {...rest}
        ref={ref}
        className={classNames.join(' ')}
        // Vendor prefixes should begin with a capital letter.
        style={{
          ...style,
          // Currently only -webkit-line-clamp is supported in browsers
          // https://www.w3.org/TR/css-overflow-3/#webkit-line-clamp
          WebkitLineClamp: lineClamp,
          // Add line-clamp for standard compatibility and engines which
          // has already support it such as Kraken
          lineClamp: lineClamp,
        }}
        onClick={handleClick}
      >
        {textString}
      </span>
    );
  }
});
Text.displayName = 'Text';
export default Text;
