const webpSuffix = '_.webp';
const ossWebpSuffix = '.webp';

/**
 * @param {any} isOSSImg
 * @returns {String}
 */
export default function(isOSSImg: any): string {
  if (isOSSImg) {
    return ossWebpSuffix;
  } else {
    return webpSuffix;
  }
}
