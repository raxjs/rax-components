import fmtEvent from './fmtEvent';

declare const wx: any;
const noop = () => {};
/**
 * miniappHref value：navigate:abc?a=1 redirect:abc?a=1 switchTab:a/b/c navigateBack:2
 * mpHref for  backward compatibility
 */

Component({
  data: {},
  properties: {
    className: '',
    style: '',
    mpHref: '',
    miniappHref: '',
    onPress: noop,
    onClick: noop,
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  methods: {
    onTap(e) {
      const event = fmtEvent(this.props, e);
      // onPress for  backward compatibility
      if (this.props.onClick === noop) {
        this.triggerEvent('onPress', event);
      } else {
        this.triggerEvent('onClick', event);
      }
      const miniappHref = this.props.miniappHref || this.props.mpHref;
      if (miniappHref) {
        const splits = miniappHref.split(':');
        const actionName = splits[0];
        const target = splits[1] || actionName;
        switch (actionName) {
          case 'navigate':
            wx.navigateTo({ url: target });
            break;
          case 'redirect':
            wx.redirectTo({ url: target });
            break;
          case 'switchTab':
            wx.switchTab({ url: target });
            break;
          case 'navigateBack':
            wx.navigateBack({ delta: target });
            break;
          default:
            wx.navigateTo({ url: target });
        }
      }
    },
  },
});
