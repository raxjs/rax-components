import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { TextProps } from '../types';
import { isMiniApp } from 'universal-env';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import '../index.css';

// add version in style to avoid conflict with older version
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

  let classNamesArr = [prefixCls, className];

  // Ali miniapp support number-of-lines so don't need extra css
  if (!isMiniApp && lines) {
    classNamesArr = classNamesArr.concat([`${prefixCls}--overflow-hidden`, `${prefixCls}--multiline`]);
  }
  const lineClamp = lines > 0 ? lines : undefined;
  const classNames = classNamesArr.join(' ');
  return (
    // @ts-ignore
    <text {...rest} ref={ref} className={classNames} style={{ ...style, WebkitLineClamp: lineClamp }} onClick={handleClick} number-of-lines={lines}
    >
      {textString}
    </text>
  );
});

export default wrapDefaultProperties(Text);
