export default function genFixedUrl(props) {
  // handle android ios
  let fixedUrl = props.src;

  const prefix = fixedUrl.indexOf('?') >= 0 ? '&' : '?';

  if (typeof props.urlParam == 'string') {
    fixedUrl += prefix + props.urlParam;
  } else {
    let paramsStrArr = [];

    let assignUrlParam = Object.assign(
      {},
      props.urlParam,
      props.defaultUrlParam
    );
    for (let k in assignUrlParam) {
      paramsStrArr.push(k + '=' + assignUrlParam[k]);
    }

    fixedUrl += prefix + paramsStrArr.join('&');
  }

  return fixedUrl;
}
