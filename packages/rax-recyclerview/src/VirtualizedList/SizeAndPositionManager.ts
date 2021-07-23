import { TItemSize } from "./types";

type TSizeGetter = (i: number) => number;
type TRenderedIndexGetter = (distance: number) => { startIndex: number; endIndex: number }; 
type TPlaceholderSizeGetter = (startIndex: number, endIndex: number) => { front: string; back: string; };

class SizeAndPositionManager {
  itemSize: TItemSize;
  bufferSize: number;
  pixelRatio: number;
  length: number;
  getRenderedIndex: TRenderedIndexGetter;
  getPlaceholderSize: TPlaceholderSizeGetter;
  getSize: TSizeGetter;

  static bufferRatio = 3;
  static clientSize;
  static pixelRatio;

  constructor({ itemSize, horizontal, length, size }: {
    itemSize: TItemSize;
    horizontal: boolean;
    length: number;
    size?: number;
  }) {
    this.length = length;
    this.bufferSize = this._getBufferSize(size, horizontal);
    this.getSize = this._initSizeGetter(itemSize);
    this.getRenderedIndex = this._initRenderedIndexGetter(itemSize);
    this.getPlaceholderSize = this._initPlaceholderSizeGetter(itemSize);
  }

  _initSizeGetter(itemSize): TSizeGetter {
    if (typeof itemSize === 'number') {
      return () => {
        return itemSize;
      };
    }

    if (typeof itemSize === 'function') {
      const sizeCache = new Map();
      return (i: number) => {
        if (sizeCache.has(i)) {
          return sizeCache.get(i);
        } else {
          const singleSize = itemSize(i);
          sizeCache.set(i, singleSize);
          return singleSize;
        }
      }
    }
    
    throw new Error(`itemSize is unValid`);
  }

  _initRenderedIndexGetter(itemSize): TRenderedIndexGetter {
    if (typeof itemSize === 'number') {
      return (scrollDistance: number) => {
        const distance = scrollDistance / SizeAndPositionManager.pixelRatio;
        let startIndex, endIndex;
        if (distance < this.bufferSize) {
          startIndex = 0;
        } else {
          startIndex = Math.floor((distance - this.bufferSize) / itemSize);
        }
        endIndex = Math.ceil(this.bufferSize * SizeAndPositionManager.bufferRatio / itemSize) + startIndex;

        return {
          startIndex,
          endIndex: Math.min(endIndex, this.length - 1)
        };
      };
    }
    return (scrollDistance: number) => {
      const distance = scrollDistance / SizeAndPositionManager.pixelRatio;
      let startIndex = -1;
      let endIndex = -1;
      let size = 0;
      const frontSize = this.bufferSize + distance;
      const backSize = this.bufferSize * SizeAndPositionManager.bufferRatio + distance;
      for (let i = 0; i < this.length; i++) {
        size += this.getSize(i);
        if (startIndex === -1 && size >= frontSize) {
          startIndex = i;
        }
        if (size >= backSize) {
          endIndex = i;
          return {
            startIndex,
            endIndex
          };
        }
      }
      return {
        startIndex,
        endIndex
      }
    }
  }

  _initPlaceholderSizeGetter(itemSize) {
    if (typeof itemSize === 'number') {
      return (startIndex, endIndex) => {
        return {
          front: startIndex * itemSize + 'rpx',
          back: (this.length - endIndex - 1) * itemSize + 'rpx'
        };
      }
    }
    return (startIndex, endIndex) => {
      let front = 0;
      let back = 0;
      for (let i = 0; i < startIndex; i++) {
        front += this.getSize(i);
      }
      for (let i = endIndex + 1; i < this.length; i++) {
        back += this.getSize(i);
      }
      return {
        front: front + 'rpx',
        back: back + 'rpx'
      };
    }
  }

  _getBufferSize(size, horizontal) {
    if (size) {
      return size;
    }
    if (horizontal) {
      return SizeAndPositionManager.clientSize.height / SizeAndPositionManager.pixelRatio;
    }
    return SizeAndPositionManager.clientSize.width / SizeAndPositionManager.pixelRatio;
  }
}

export default SizeAndPositionManager;