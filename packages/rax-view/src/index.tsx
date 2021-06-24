import { isMiniApp, isWeb } from 'universal-env';
import ViewCommon from './common';
import ViewMiniApp from './miniapp';

let View = null;

if (isWeb) {
  View = ViewCommon;
} else if (isMiniApp) {
  View = ViewMiniApp;
} else {
  View = ViewCommon;
}

export default View;


