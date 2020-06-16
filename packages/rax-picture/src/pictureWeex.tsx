import {
  createElement
} from 'rax';
import Image from 'rax-image';
import { PictureProps } from './types';


const Picture = (props: PictureProps) => {
  let {
    children,
    style = {},
    source,
    resizeMode,
    width,
    height,
    defaultHeight,
    ...rest
  } = props;
  let styleWidth = style.width; // style width of picture
  let styleHeight = style.height; // style width of picture

  // according to the original height and width of the picture
  if (!styleHeight && styleWidth && width && height) {
    const pScaling =
      width /
      (typeof styleWidth === 'string'
        ? parseInt(styleWidth, 10)
        : styleWidth);
    styleHeight = parseInt(height / pScaling + '', 10);
  }

  if (!styleHeight) {
    styleHeight = defaultHeight;

    if (!resizeMode) {
      // ensure that the picture can be displayed
      resizeMode = 'contain';
    }
  }

  let newStyle = Object.assign(
    {
      height: styleHeight
    },
    style
  );

  if (resizeMode) {
    newStyle.resizeMode = resizeMode;
  }

  return (
    <Image {...rest} source={source} style={newStyle}>
      {children}
    </Image>
  );
}

export default Picture;
