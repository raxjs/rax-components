import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import Text from 'rax-text';
import { LinkProps } from './types';

const Link: ForwardRefExoticComponent<LinkProps> = forwardRef((props, ref) => {
  const { className, style = {}, onClick, onPress, children, ...rest } = props;
  const textStyle = {
    color: style.color,
    lines: style.lines,
    fontSize: style.fontSize,
    fontStyle: style.fontStyle,
    fontWeight: style.fontWeight,
    textDecoration: style.textDecoration || 'none',
    textAlign: style.textAlign,
    fontFamily: style.fontFamily,
    textOverflow: style.textOverflow
  };
  return (
    <a
      {...rest}
      ref={ref}
      className={className}
      style={style}
      onClick={onClick || onPress}
    >
      {typeof children === 'string' ? (
        <Text style={textStyle}>{children}</Text>
      ) :
        children
      }
    </a>
  );
});

export default Link;
