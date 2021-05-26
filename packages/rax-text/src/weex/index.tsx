import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { TextProps } from '../types';
import wrapper from '../utils/wrapper';
import '../index.css';

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
      <text {...rest} ref={ref} className={className} style={{ lines, ...style }} onClick={handleClick}>
        {textString}
      </text>
    );
});

export default wrapper(Text);
