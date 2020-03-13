const CALCULATION_ACCURACY = 8;

function getStyleNumber(styleProp, screenWidth) {
  const rpxEndIndex = styleProp.indexOf('rpx');
  if (rpxEndIndex > 0) {
    const value = Number(styleProp.substring(0, rpxEndIndex));
    return Number((screenWidth / 750 * value).toFixed(CALCULATION_ACCURACY));
  } else {
    const pxEndIndex = styleProp.indexOf('px');
    if (pxEndIndex > 0) {
      return styleProp.substring(0, pxEndIndex);
    } else {
      return styleProp;
    }
  }
}

function trimString(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}


function getStyleProps(key, styles) {
  if (styles === '') {
    return '';
  }
  const props = styles.split(';');
  let value;
  props.forEach(prop => {
    const [propKey, propValue] = prop.split(':');
    if (trimString(propKey) === key) {
      value = trimString(propValue);
    }
  });
  return value;
}

export {
  getStyleNumber,
  getStyleProps
};
