function genFixedUrl(fixedUrl, urlParam) {
  // handle android ios

  const prefix = fixedUrl.indexOf('?') >= 0 ? '&' : '?';

  if (typeof urlParam == 'string') {
    fixedUrl += prefix + urlParam;
  } else {
    let paramsStrArr = [];

    let assignUrlParam = Object.assign({}, urlParam);
    for (let k in assignUrlParam) {
      paramsStrArr.push(k + '=' + assignUrlParam[k]);
    }

    fixedUrl += prefix + paramsStrArr.join('&');
  }

  return fixedUrl;
}

module.exports = {
  genFixedUrl
};
