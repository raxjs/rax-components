/**
 * @param  {String} compressSuffix
 * @param  {Number} quality
 * @param  {Number} acutance
 * @param  {any} isOSSImg
 * @return {String}
 */
export default function(compressSuffix: string, quality: string, acutance: number, isOSSImg: any) {
  if (isOSSImg) {
    // @90q（Q） ['@75q', '@50q']
    if (compressSuffix.startsWith('Q')) {
      compressSuffix = '_' + compressSuffix.split('Q')[1] + 'Q';
    }
    return compressSuffix ? compressSuffix :
      quality ? '_' + quality : 'Q';
  } else {
    // _Q(q)90 ['Q75', 'Q50']
    return compressSuffix ? compressSuffix :
      (quality ? 'Q' + quality : '') + (acutance ? 'S' + acutance : '');
  }
}
