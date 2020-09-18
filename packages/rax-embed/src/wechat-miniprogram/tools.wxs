export default function genFixedUrl(fixedUrl, urlParam = {}) {
  const prefix = fixedUrl.indexOf('?') >= 0 ? '&' : '?';

  if (typeof urlParam == 'string') {
    fixedUrl += prefix + urlParam;
  } else {
    Object.keys(urlParam).forEach((key, index) => {
      if (index === 0) {
        fixedUrl += prefix + urlParam[key];
      } else {
        fixedUrl += '&' + urlParam[key];
      }
    });
  }

  return fixedUrl;
}
