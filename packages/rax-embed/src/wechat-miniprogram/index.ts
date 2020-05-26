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
      props.urlParam
    );
    for (let k in assignUrlParam) {
      paramsStrArr.push(k + '=' + assignUrlParam[k]);
    }

    fixedUrl += prefix + paramsStrArr.join('&');
  }

  return fixedUrl;
}

Component({
  data: {
    url: '',
  },
  props: {
    src: '',
    urlParam: '',
    onMessage: () => {}
  },
  onInit() {
    this.setData({
      url: genFixedUrl(this.props)
    });
  },
  deriveDataFromProps(nextProps) {
    this.setData({
      url: genFixedUrl(nextProps)
    });
  },
  didMount() {
    if(!my.canIUse('components2')) {
      this.setData({
        url: genFixedUrl(this.props)
      });
    }
  },
  methods: {
    onMessage(e) {
      this.triggerEvent('onMessage', e.detail);
    }
  }
});
