import {
  createElement,
  ForwardRefExoticComponent,
  forwardRef
} from 'rax';
import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import IconWeb from './web';
import IconMiniApp from './miniapp-runtime';
import IconWeex from './weex';
import { IconFontProps } from './types';

let Icon = null;

if (isWeb) {
  Icon = IconWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Icon = IconMiniApp;
} else if (isWeex) {
  Icon = IconWeex;
} else {
  Icon = IconWeb;
}

export default Icon;
export * from './types';


export function createIconSet(
  glyphMap = {},
  fontFamily: string,
  fontFile: string
) {
  const IconFont: ForwardRefExoticComponent<IconFontProps> = forwardRef(
    ({ name, className, codePoint, style = {}, ...rest }, ref) => {
      return (
        <Icon
          {...rest}
          ref={ref}
          className={className}
          style={style}
          source={{ uri: fontFile, codePoint: codePoint || glyphMap[name] }}
          fontFamily={fontFamily}
        />
      );
    }
  );
  IconFont.displayName = 'IconFont';
  return IconFont;
}
