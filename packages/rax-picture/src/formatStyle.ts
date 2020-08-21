/**
 * compact style as array
 */
export default function formatStyle(style) {
  if (style && typeof style === 'object' && style instanceof Array) {
    let result = {};
    style.map(tmp => {
      result = Object.assign(result, tmp || {});
      return ;
    });
    return result;
  }
  return style;
}
