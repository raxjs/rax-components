import {
  createElement,
  ForwardRefExoticComponent,
  forwardRef
} from 'rax';
import Text from 'rax-text';
import Image from 'rax-image';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { IconProps, IconFontProps } from '../types';

declare const __weex_require__: any;

let domModule = null;

try {
  domModule = __weex_require__('@weex-module/dom');
} catch (error) {
  console.log('require @weex-module/dom error');
}

const fontCache = new Map();
const Icon = forwardRef<HTMLSpanElement | HTMLImageElement, IconProps>(
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
      // In Weex, this font not be loaded yet, load now
      const source = `url('${uri}')`;
      fontCache.set(fontFamily, uri);
      domModule.addRule('fontFace', {
        fontFamily,
        src: source // single quotes are required around uri, and double quotes can not work
      });
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
