import { isWeb } from 'universal-env';

let width;
let devicePixelRatio = 2;
if (isWeb) {
  const screenWidth = window.screen.width;
  width = screenWidth ? screenWidth : document.documentElement.clientWidth / 750 * screenWidth;
  
  //是否自适应高倍屏幕CDN裁切
  if(window.__adaptDevicePixelRatio){
    devicePixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 2
    if(devicePixelRatio < 2){
      devicePixelRatio = 2;
    }
    //默认是2倍处理方式，当是高倍屏幕时根据devicePixelRatio调整
    width = width * devicePixelRatio / 2;
  }

}

const scalingWidth = [
  // use width
  80, // 80x80
  110,
  140,
  150,
  170,
  220,
  230,
  234, // 234x234
  240,
  284, // 284x284
  290,
  300,
  310, // 310x310
  320, // 320x320
  336, // 336x336
  350, // 350x350
  360,
  400, // 400x400
  450,
  468, // 468x468
  500,
  570,
  580,
  620,
  640, // 640x640
  720, // 720x720
  790,
  960, // 960x960
  1080, // 1080x1080
  1200, // 1200x1200
  2200 // 2200x2200
];

const scalingWidthMap = {
  "80":80,
  "234":234,
  "284":284,
  "310":310,
  "320":320,
  "336":336,
  "350":350,
  "400":400,
  "468":468,
  "640":640,
  "720":720,
  "960":960,
  "1080":1080,
  "1200":1200,
  "2200":2200
}

const visualStandard = 750;

function find(width: number) {
  let min = 1000;
  let result = width;
  let fKey = 0;
  let isMatchValue = false;
  for (let i = 0,j = scalingWidth.length; i < j; i++) {
    const num = scalingWidth[i];
    let abs = Math.abs(num - width);
    if (abs === 0) {
      result = num;
      fKey = i;
      isMatchValue = true;
    }
    if (min > abs && !isMatchValue) {
      min = abs;
      result = num;
      fKey = i;
    }
  }
  if (width > result && scalingWidth[fKey + 1]) {
    result = scalingWidth[fKey + 1];
  }
  if (scalingWidth.indexOf(result) > -1) {
    return result;
  }
  return false;
}

/**
 * @param {String | Number} sWidth
 * @param {any} isOSSImg
 * @returns {String}
 */
export default function(sWidth: string | number, isOSSImg: any): string {
  let xWidth = 0;
  let scaling = 1;
  scaling = scaling * 2 / devicePixelRatio; //默认是2倍处理方式，当是高倍屏幕时根据devicePixelRatio调整

  if (typeof sWidth === 'string') {
    xWidth = parseFloat(sWidth);
    if (sWidth.indexOf('rpx') > -1) {
      // isRpx
      if (width) {
        scaling = visualStandard / width;
      }
    }
  } else {
    // isNum
    xWidth = sWidth;
  }
  const newWidth = find(Math.floor(xWidth / scaling));
  return newWidth ? isOSSImg ? `_${newWidth}w` : `${newWidth}x${scalingWidthMap[newWidth + ''] || '10000'}` : '';
}
