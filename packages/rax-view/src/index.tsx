import { isMiniApp } from 'universal-env';
import ViewCommon from './common';
import ViewMiniApp from './miniapp';

let View = null;

if (isMiniApp) {
  View = ViewMiniApp;
} else {
  View = ViewCommon;
}

export default View;


