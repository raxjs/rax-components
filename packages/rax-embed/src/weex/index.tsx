import { createElement } from 'rax';
import genFixedUrl from '../utils/genFixedUrl';

import { Props } from '../types';

function isWeexUrl(url) {
  return /(_wx_tpl=[^\s&]|wh_weex=true)/.test(url);
}

const defaultProps: Props = {
  defaultUrlParam: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    _page_inside_embed_: 'true',
    // eslint-disable-next-line @typescript-eslint/camelcase
    _page_home_isweex_: true,
    useIframeInWeb: false
  },
  urlParam: {},
  src: ''
};

const Embed = (props: Props) => {
  props = { ...defaultProps, ...props };

  let url = genFixedUrl(props);

  if (isWeexUrl(url)) {
    return (
      <embed
        {...props}
        type="weex"
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
