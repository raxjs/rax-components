import SizeAndPositionManager from '../VirtualizedList/SizeAndPositionManager';
import getVirtualizedList from '../VirtualizedList';

const FULL_WIDTH = 750;
SizeAndPositionManager.clientSize = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
};
SizeAndPositionManager.pixelRatio = document.documentElement.clientWidth / FULL_WIDTH;

const VirtualizedList = getVirtualizedList(SizeAndPositionManager);
export default VirtualizedList;