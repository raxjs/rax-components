import {
  createElement,
  ForwardRefExoticComponent,
  forwardRef
} from 'rax';
import Text from 'rax-text';
import Image from 'rax-image';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { IconProps, IconFontProps } from '../types';

const fontCache = new Map();
const Icon: ForwardRefExoticComponent<IconProps> = forwardRef<HTMLSpanElement | HTMLImageElement, IconProps>(
  ({ source: { uri, codePoint } = {}, fontFamily, style = {}, ...rest }, ref) => {
    if (uri && !codePoint && !fontFamily) {
      return <Image {...rest} source={{ uri }} style={style} />;
    }
    if (!fontFamily) {
      return (
        <Text {...rest} ref={ref} style={style}>
          {codePoint}
        </Text>
      );
    }
    const fontFile = fontCache.get(fontFamily);
    if (!fontFile) {
      // In Web and Weex, this font not be loaded yet, load now
      // In Miniapp, iconfont must be loaded every time when page changes
      const source = `url('${uri}')`;
      fontCache.set(fontFamily, uri);
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
    } else if (fontFile !== uri) {
      console.error(`font-family ${fontFamily} should be unique!`);
      return null;
    }
    return (
      <Text {...rest} ref={ref} style={{
        ...style,
        fontFamily
      }}>
        {codePoint}
      </Text>
    );
  }
);

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

export default wrapDefaultProperties(Icon);
