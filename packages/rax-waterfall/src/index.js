import { isWeex } from 'universal-env';
import CommonWaterFall from './common';
import WeexWaterFall from './weex';

let WaterFall = CommonWaterFall;
if (isWeex) {
  WaterFall = WeexWaterFall;
}

export default WaterFall;
