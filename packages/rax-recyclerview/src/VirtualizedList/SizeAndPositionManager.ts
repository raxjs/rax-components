import { TItemSize } from './types';

type TSizeGetter = (i: number) => number;
type TRenderedIndexGetter = (distance: number) => { startIndex: number; endIndex: number };
type TPlaceholderSizeGetter = (startIndex: number, endIndex: number) => { front: string; back: string };

class SizeAndPositionManager {
  private bufferSize: number;
  private readonly length: number;
  private getSize: TSizeGetter;

  public getRenderedIndex: TRenderedIndexGetter;
  public getPlaceholderSize: TPlaceholderSizeGetter;

  public static bufferRatio = 3;
  public static clientSize;
  public static pixelRatio: number;

  public constructor({ itemSize, horizontal, length, bufferSize }: {
    itemSize: TItemSize;
    horizontal: boolean;
    length: number;
    bufferSize?: number;
  }) {
    this.length = length;
    this.bufferSize = this.getBufferSize(bufferSize, horizontal);
    this.getSize = this.initSizeGetter(itemSize);
    this.getRenderedIndex = this.initRenderedIndexGetter(itemSize);
    this.getPlaceholderSize = this.initPlaceholderSizeGetter(itemSize);
  }

  private initSizeGetter(itemSize): TSizeGetter {
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
      };
    }

    throw new Error('itemSize is unValid');
  }

  private initRenderedIndexGetter(itemSize): TRenderedIndexGetter {
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
      };
    };
  }

  private initPlaceholderSizeGetter(itemSize) {
    if (typeof itemSize === 'number') {
      return (startIndex, endIndex) => {
        return {
          front: startIndex * itemSize + 'rpx',
          back: (this.length - endIndex - 1) * itemSize + 'rpx'
        };
      };
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
    };
  }

  private getBufferSize(bufferSize, horizontal) {
    if (bufferSize) {
      return bufferSize;
    }
    if (horizontal) {
      return SizeAndPositionManager.clientSize.width / SizeAndPositionManager.pixelRatio;
    }
    return SizeAndPositionManager.clientSize.height / SizeAndPositionManager.pixelRatio;
  }
}

export default SizeAndPositionManager;