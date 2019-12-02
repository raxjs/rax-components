import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { isWeex } from 'universal-env';
import { TextProps } from './types';
import './index.css';

const prefixCls = 'rax-text';
const isObject = (value: any) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};
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
  const child = isObject(children) ? children.toString() : children;
  if (isWeex) {
    return (
      <text
        {...rest}
        ref={ref}
        className={className}
        style={{ textOverflow: 'ellipsis', lines, ...style }}
        onClick={handleClick}
      >
        {child}
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
        style={{ ...style, webkitLineClamp: lines > 1 ? lines : undefined }}
        onClick={handleClick}
      >
        {child}
      </span>
    );
  }
});
Text.displayName = 'Text';
export default Text;
