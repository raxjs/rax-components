import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import { isMiniApp, isWeChatMiniProgram } from 'universal-env';
import Text from 'rax-text';
import { LinkProps } from './types';

const Link: ForwardRefExoticComponent<LinkProps> = forwardRef((props, ref) => {
  const { className, style = {}, onClick, onPress, children, miniappHref = '', ...rest } = props;
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
  if (isMiniApp || isWeChatMiniProgram) {
    // miniappHref example: navigate:/pages/index/index
    const [ openType, url ] = miniappHref.split(':');
    return (
      <navigator
        open-type={openType}
        url={url}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </navigator>
    );
  }
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
Link.displayName = 'Link';
export default Link;
