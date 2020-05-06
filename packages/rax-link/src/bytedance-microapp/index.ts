import fmtEvent from './fmtEvent';

declare const tt: any;
const noop = () => {};
/**
 * miniappHref value：navigate:abc?a=1 redirect:abc?a=1 switchTab:a/b/c navigateBack:2
 * mpHref for  backward compatibility
 */

Component({
  data: {},
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    mpHref: {
      type: String,
      value: ''
    },
    miniappHref: {
      type: String,
      value: ''
    },
    onPress: noop
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  methods: {
    onTap(e) {
      const event = fmtEvent(this.properties, e);
      // onPress for  backward compatibility
      this.triggerEvent('onPress', event.detail);
      this.triggerEvent('onClick', event.detail);
      const miniappHref = this.properties.miniappHref || this.properties.mpHref;
      if (miniappHref) {
        const splits = miniappHref.split(':');
        const actionName = splits[0];
        const target = splits[1] || actionName;
        switch (actionName) {
          case 'redirect':
            tt.redirectTo({ url: target });
            break;
          case 'switchTab':
            tt.switchTab({ url: target });
            break;
          case 'navigateBack':
            tt.navigateBack({ delta: target });
            break;
          case 'navigate':
          default:
            tt.navigateTo({ url: target });
        }
      }
    },
  },
});
