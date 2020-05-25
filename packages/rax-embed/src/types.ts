import * as Rax from 'rax';

export interface Props extends Rax.Attributes {
  defaultUrlParam?: {
    _page_inside_embed_: string;
    _page_home_isweex_: boolean;
    useIframeInWeb: boolean;
  };
  urlParam?: { [key: string]: any } | string;
  src?: string;
  useIframeInWeb?: boolean;
  style?: Rax.CSSProperties;
}
