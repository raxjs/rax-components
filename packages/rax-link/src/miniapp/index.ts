import fmtEvent from './fmtEvent';

const noop = () => {};
/**
 * miniappHref value：navigate:abc?a=1 redirect:abc?a=1 switchTab:a/b/c navigateBack:2
 * mpHref for  backward compatibility
 */
console.warn('组件所依赖的 rax-link 版本较旧，请尽快重新构建发布该组件');
Component({
  data: {},
  props: {
    className: '',
    style: '',
    mpHref: '',
    miniappHref: '',
    onPress: noop,
    onClick: noop,
  },
  methods: {
    onTap(e) {
      const event = fmtEvent(this.props, e);
      // onPress for  backward compatibility
      if (this.props.onClick === noop) {
        this.props.onPress(event);
      } else {
        this.props.onClick(event);
      }
      const miniappHref = this.props.miniappHref || this.props.mpHref;
      if (miniappHref) {
        const splits = miniappHref.split(':');
        const actionName = splits[0];
        const target = splits[1] || actionName;
        switch (actionName) {
          case 'redirect':
            my.redirectTo({ url: target });
            break;
          case 'switchTab':
            my.switchTab({ url: target });
            break;
          case 'navigateBack':
            my.navigateBack({ delta: target });
            break;
          case 'navigate':
          default:
            my.navigateTo({ url: target });
        }
      }
    },
  },
});
