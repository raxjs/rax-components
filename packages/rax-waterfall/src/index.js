import {isWeex} from 'universal-env';
import WebWaterFall from './waterfall.web';
import WeexWaterFall from './waterfall.weex';

let WaterFall = WebWaterFall;
if (isWeex) {
  WaterFall = WeexWaterFall;
}

export default WaterFall;
