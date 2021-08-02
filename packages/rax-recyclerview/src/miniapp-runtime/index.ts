import getInfoSync from './getInfoSync';
import getVirtualizedList from '../VirtualizedList';
import SizeAndPositionManager from '../VirtualizedList/SizeAndPositionManager';

const FULL_WIDTH = 750;
const { windowHeight, windowWidth } = getInfoSync();
SizeAndPositionManager.clientSize = {
  width: windowWidth,
  height: windowHeight
};
SizeAndPositionManager.pixelRatio = windowWidth / FULL_WIDTH;

const VirtualizedList = getVirtualizedList(SizeAndPositionManager);
export default VirtualizedList;