import { TItemSize } from './types';

type TSizeGetter = (i: number) => number;
class SizeAndPositionManager {
  private bufferSize: number;
  private readonly length: number;
  private getSize: TSizeGetter;
  private pages: Array<{
    startIndex: number;
    endIndex: number;
    startPos: number;
    endPos: number;
  }> = [];

  public totalSize: number;

  public static bufferRatio = 1;
  public static clientSize;
  public static pixelRatio: number;

  public constructor({ itemSize, horizontal, length, bufferSize, totalSize, estimateSize }: {
    itemSize: TItemSize;
    horizontal: boolean;
    length: number;
    bufferSize?: number;
    totalSize?: number;
    estimateSize?: number;
  }) {
    this.length = length;
    this.bufferSize = this.getBufferSize(bufferSize, horizontal);
    this.getSize = this.initSizeGetter(itemSize);
    this.initManager();
  }

  private initManager() {
    this.pages = [];
    // sort items in pages 
    let size = 0;
    let prevExtraSize = 0;
    for (let i = 0; i < this.length;) {
      const { endIndex, pageSize, extraSize } = this.calPageInfo(i, prevExtraSize);
      this.pages.push({
        startIndex: i,
        endIndex,
        startPos: size,
        endPos: size + pageSize
      });
      i = endIndex + 1;
      size += pageSize;
      prevExtraSize = extraSize;
    }
    this.totalSize = size;
  }

  private calPageInfo(index: number,  prevExtraSize: number) {
    let size = 0;
    while(index < this.length && size < this.bufferSize - prevExtraSize) {
      size += this.getSize(index);
      index++;
    }
    return {
      endIndex: index - 1,
      pageSize: size,
      extraSize: size - this.bufferSize + prevExtraSize
    };
  }

  private getBufferSize(bufferSize, horizontal): number {
    if (bufferSize) {
      return bufferSize;
    }
    if (horizontal) {
      return SizeAndPositionManager.clientSize.width / SizeAndPositionManager.pixelRatio;
    }
    return SizeAndPositionManager.clientSize.height / SizeAndPositionManager.pixelRatio;
  }

  private initSizeGetter(itemSize) {
    if (typeof itemSize === 'number') {
      return () => {
        return itemSize;
      }
    }
    return (i) => {
      const size = itemSize(i);
      if (typeof size !== 'number') {
        console.error(`rax-recyclerview: ${i} 节点的 size 为 ${size}，不是 number 类型`);
        return 0;
      }
      return size;
    }
  }

  calCurrent(scrollDistance: number) {
    const distance = scrollDistance / SizeAndPositionManager.pixelRatio;
    const pageIndex = distance === 0 ? 0 : Math.ceil(distance / this.bufferSize) - 1;
    const prevPageIndex = Math.max(0, pageIndex - 1);
    const nextPageIndex = Math.min(this.pages.length, pageIndex + 1);
    const prevPage = this.pages[prevPageIndex];
    const nextPage = this.pages[nextPageIndex];
    console.log(distance)
    if (prevPage && nextPage) {
      return {
        startIndex: prevPage.startIndex,
        endIndex: nextPage.endIndex,
        front: prevPage.startPos,
        back: this.totalSize - nextPage.endPos
      };
    }
    return {
      startIndex: 0,
      endIndex: this.length,
      front: 0,
      back: 0
    };
  }

  setPageSize(index, size) {
    const page = this.pages[index];
    if (page) {
      const errorSize = page.endPos - page.startPos - size;
      page.endPos = page.startPos + size;
      for (let i = index + 1; i < this.pages.length; i ++) {
        this.pages[i].startPos = this.pages[i].startPos - errorSize;
        this.pages[i].endPos = this.pages[i].endPos - errorSize;
      }
    }
  }
}

export default SizeAndPositionManager;