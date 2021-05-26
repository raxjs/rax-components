import { createElement } from 'rax';
import genFixedUrl from '../utils/genFixedUrl';

import { Props } from '../types';

const defaultProps: Props = {
  defaultUrlParam: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    _page_inside_embed_: 'true',
    // eslint-disable-next-line @typescript-eslint/camelcase
    _page_home_isweex_: false,
    useIframeInWeb: false
  },
  urlParam: {},
  src: ''
};

const Embed = (props: Props) => {
  props = { ...defaultProps, ...props };
  let url = genFixedUrl(props);
  return (
    <web-view
      id={props.id || ''}
      src={url}
      onMessage={props.onMessage}
    >
    </web-view>
  );
};

export default Embed;
