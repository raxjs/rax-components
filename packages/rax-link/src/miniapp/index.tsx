import { createElement, forwardRef, ForwardRefExoticComponent } from 'rax';
import wrapper from '../utils/wrapper';
import { LinkProps } from '../types';

const Link: ForwardRefExoticComponent<LinkProps> = forwardRef((props, ref) => {
  const { className, style = {}, onClick, onPress, children, miniappHref = '', ...rest } = props;
  // miniappHref example: navigate:/pages/index/index
  const [ openType, url ] = miniappHref.split(':');
  return (
    // @ts-ignore
    <view onClick={onClick || onPress}>
      <navigator
        ref={ref}
        open-type={openType}
        url={url}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </navigator>
    </view>
  );
});
export default wrapper(Link);
