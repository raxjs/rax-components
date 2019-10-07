/**
 * @param {String} url
 * @returns {String}
 */
export default function(url: string): string {
  return url.replace(/(http|https):/gi, '');
}
