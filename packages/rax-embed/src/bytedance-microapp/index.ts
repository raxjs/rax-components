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
  properties: {
    src: {
      type: String,
      value: ''
    },
    urlParam: {
      type: String,
      optionalTypes: [Object]
    }
  },
  attached() {
    this.setData({
      url: genFixedUrl(this.props)
    });
  },
  observers: {
    'src, urlParam': function(src, urlParam) {
      this.setData({
        url: genFixedUrl({src, urlParam})
      });
    }
  },
  methods: {
    onMessage(e) {
      this.props.onMessage(e);
    }
  }
});
