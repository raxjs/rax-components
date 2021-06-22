import {
  createElement,
  forwardRef
} from 'rax';
import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import Text from 'rax-text';
import Image from 'rax-image';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { IconProps } from '../types';

declare const tt: any;


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
      // In Miniapp, iconfont must be loaded every time when page changes
      const source = `url('${uri}')`;
      if (isMiniApp) {
        if (typeof my.loadFontFace === 'function') {
          my.loadFontFace({
            family: fontFamily,
            source
          });
        } else {
          console.warn('Your container may not support my.loadFontFace! Please check it and use local fontfamily.');
        }
      } else if (isWeChatMiniProgram) {
        wx.loadFontFace({
          family: fontFamily,
          source
        });
      } else if (isByteDanceMicroApp) {
        tt.loadFont(uri);
      } else if (isBaiduSmartProgram || isKuaiShouMiniProgram) {
        console.warn('Current container does not support loading font face from uri.');
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

export default wrapDefaultProperties(Icon);
