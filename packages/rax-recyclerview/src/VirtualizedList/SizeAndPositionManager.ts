import { TItemSize } from './types';

type TSizeGetter = (i: number) => number;
type TRenderedIndexGetter = (distance: number) => { startIndex: number; endIndex: number };
type TPlaceholderSizeGetter = (startIndex: number, endIndex: number) => { front: number; back: number; show?: string };

class SizeAndPositionManager {
  private bufferSize: number;
  private readonly length: number;
  private getSize: TSizeGetter;

  public totalSize: number;

  public getRenderedIndex: TRenderedIndexGetter;
  public getPlaceholderSize: TPlaceholderSizeGetter;

  public static bufferRatio = 1;
  public static clientSize;
  public static pixelRatio: number;

  public static initRenderedIndex = { startIndex: -1, endIndex: -1 }

  public constructor({ itemSize, horizontal, length, bufferSize, totalSize }: {
    itemSize: TItemSize;
    horizontal: boolean;
    length: number;
    bufferSize?: number;
    totalSize?: number;
  }) {
    this.length = length;
    this.bufferSize = this.getBufferSize(bufferSize, horizontal);
    this.getSize = this.initSizeGetter(itemSize);
    this.getRenderedIndex = this.initRenderedIndexGetter(itemSize);
    this.getPlaceholderSize = this.initPlaceholderSizeGetter(itemSize);
    this.totalSize = totalSize ? totalSize : this.getTotalSize(itemSize, length);
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

    throw new Error('itemSize is inValid');
  }

  private initRenderedIndexGetter(itemSize): TRenderedIndexGetter {
    if (typeof itemSize === 'number') {
      return (scrollDistance: number) => {
        const distance = scrollDistance / SizeAndPositionManager.pixelRatio;
        const pageIndex = Math.floor(distance / this.bufferSize);
        const startIndex = pageIndex > SizeAndPositionManager.bufferRatio ? Math.floor((pageIndex - SizeAndPositionManager.bufferRatio) * this.bufferSize / itemSize) : 0;
        const endIndex = Math.ceil((pageIndex + SizeAndPositionManager.bufferRatio + 1) * this.bufferSize / itemSize);
        
        return {
          startIndex,
          endIndex: Math.min(endIndex, this.length - 1)
        };
      };
    }

    // key: pageIndex
    // value: {
    //   start: [startIndex, startSize],
    //   end: [endIndex, endSize]
    // }
    const pageMap = new Map(); 

    function getPage(index) {
      if (pageMap.has(index)) {
        return pageMap.get(index);
      }
      const firstPageSize = this.bufferSize * SizeAndPositionManager.bufferRatio;
      if (index === 0) {
        let endIndex = this.length - 1;
        let size = 0;
        for (let i = 0; i < this.length; i++){
          size += this.getSize(i);
          if (size >= firstPageSize) {
            endIndex = i;
            break;
          }
        }
        pageMap.set(0, {
          start: [0, 0],
          end: [endIndex, size]
        });
        return pageMap.get(0);
      }
      const { end } = getPage(index - 1);

      const [preEndIndex, preEndSize] = end;
      let size = preEndSize;
      let endSize = this.length - 1;
      const pageSize = firstPageSize * (index + 1);
      for (let i = preEndIndex + 1; i < this.length; i++) {
        size += this.getSize(i);
        if (size >= pageSize) {
          endSize = i;
          break;
        }
      }
      pageMap.set(index, {
        start: [preEndSize - 1, preEndSize - this.getSize(preEndSize)],
        end: [endSize, size]
      });
    }

    return (scrollDistance: number) => {
      const distance = scrollDistance / SizeAndPositionManager.pixelRatio;
      const pageIndex = Math.floor(distance / this.bufferSize);
      const frontPageIndex = Math.max(0, pageIndex - SizeAndPositionManager.bufferRatio);
      const { start: [ startIndex ] } = getPage(frontPageIndex);
      const backPageIndex = pageIndex + SizeAndPositionManager.bufferRatio + 1;
      const { end: [ endIndex ] } = getPage(backPageIndex);
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
          front: startIndex * itemSize,
          back: (this.length - endIndex - 1) * itemSize,
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
        front: front,
        back: back,
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

  private getTotalSize(itemSize: TItemSize, length: number): number {
    if (typeof itemSize === 'number') {
      return itemSize * length;
    }
    let size;
    for (let i = 0; i < length; i++) {
      size += this.getSize(i);
    }
    return size;
  }
}

export default SizeAndPositionManager;