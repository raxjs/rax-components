import {
  createElement,
  RefAttributes,
  HTMLAttributes,
  ForwardRefExoticComponent,
  forwardRef
} from 'rax';
import { isWeex, isWeb, isMiniApp, isWeChatMiniProgram } from 'universal-env';
import Text from 'rax-text';
import Image from 'rax-image';

declare const __weex_require__: any;
export interface IconProps
  extends RefAttributes<HTMLSpanElement>,
  HTMLAttributes<HTMLSpanElement> {
  source: {
    uri: string;
    codePoint: string;
  };
  fontFamily: string;
}

export interface IconFontProps
  extends RefAttributes<HTMLSpanElement>,
  HTMLAttributes<HTMLSpanElement> {
  name: string;
}

let domModule = null;
try {
  domModule = __weex_require__('@weex-module/dom');
} catch (error) {
  console.log('require @weex-module/dom error');
}
const fontCache = new Map();
const Icon: ForwardRefExoticComponent<IconProps> = forwardRef(
  ({ source: { uri, codePoint }, fontFamily, style = {}, ...rest }, ref) => {
    if (uri && !codePoint) {
      return <Image source={{ uri }} style={style} />;
    }
    const fontFile = fontCache.get(fontFamily);
    if (!fontFile) {
      fontCache.set(fontFamily, uri);
      const source = `url('${uri}')`;
      if (isWeb) {
        if (window.FontFace) {
          const iconfont = new window.FontFace(fontFamily, source);
          document.fonts.add(iconfont);
        } else {
          const iconFontStyles = `@font-face {
                src: ${source};
                font-family: ${fontFamily};
              }`;
          // Create stylesheet
          const style = document.createElement('style');
          style.type = 'text/css';
          style.appendChild(document.createTextNode(iconFontStyles));
          document.head.appendChild(style);
        }
      } else if (isWeex) {
        domModule.addRule('fontFace', {
          fontFamily,
          src: source // single quotes are required around uri, and double quotes can not work
        });
      } else if (isMiniApp) {
        my.loadFontFace({
          family: fontFamily,
          source
        });
      } else if (isWeChatMiniProgram) {
        wx.loadFontFace({
          family: fontFamily,
          source
        });
      }
    } else if (fontFile !== uri) {
      console.error(`font-family ${fontFamily} should be unique!`);
      return null;
    }
    return (
      <Text {...rest} ref={ref} style={{ ...style, fontFamily }}>
        {codePoint}
      </Text>
    );
  }
);
Icon.displayName = 'Icon';

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

export default Icon;
