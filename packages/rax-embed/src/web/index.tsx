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
  let { useIframeInWeb } = props;
  let url = genFixedUrl(props);

  if (useIframeInWeb) {
    return (
      <iframe
        {...props}
        type=""
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

  return (
    <embed
      {...props}
      type=""
      itemId={1}
      src={url}
      style={{ ...props.style, ...{ visibility: 'visible' } }}
    />
  );
};

export default Embed;
