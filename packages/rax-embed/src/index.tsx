import { createElement } from 'rax';
import { isWeex, isWeb } from 'universal-env';
import { Props } from './types';

function isWeexUrl(url) {
  return /(_wx_tpl=[^\s&]|wh_weex=true)/.test(url);
}

function genFixedUrl(props) {
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

const defaultProps: Props = {
  defaultUrlParam: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    _page_inside_embed_: 'true',
    // eslint-disable-next-line @typescript-eslint/camelcase
    _page_home_isweex_: isWeex,
    useIframeInWeb: false
  },
  urlParam: {},
  src: ''
};

const Embed = (props: Props) => {
  props = { ...defaultProps, ...props };
  let { useIframeInWeb } = props;
  let url = genFixedUrl(props);

  if (useIframeInWeb && isWeb) {
    return (
      <iframe
        {...props}
        type={isWeex ? 'weex' : ''}
        itemId={1}
        src={url}
        style={{
          ...{ borderWidth: 0 },
          ...props.style,
          ...{ visibility: 'visible' }
        }}
      />
    );
  }

  if (isWeex && isWeexUrl(url) || isWeb) {
    return (
      <embed
        {...props}
        type={isWeex ? 'weex' : ''}
        itemId={1}
        src={url}
        style={{ ...props.style, ...{ visibility: 'visible' } }}
      />
    );
  } else {
    return <web {...props} src={url} style={props.style} />;
  }
};

export default Embed;
