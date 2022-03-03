import { TItemSize } from './types';

type TSizeGetter = (i: number) => number;
interface RenderInfo {
  renderedIndexs: [number, number];
  placeholderSizes: [number, number];
  pageIndexs: [number, number];
}
class SizeAndPositionManager {
  private bufferSize: number;
  private readonly length: number;
  private getSize: TSizeGetter;
  private pages: {
    startIndex: number;
    endIndex: number;
    startPos: number;
    endPos: number;
  }[] = [];

  public totalSize: number;

  public static bufferRatio = 1;
  public static clientSize;
  public static pixelRatio: number;

  private isExactly: boolean = true;
  private isCorrecting: boolean = false;

  public constructor({ itemSize, horizontal, length, bufferSize, itemEstimateSize }: {
    itemSize: TItemSize;
    horizontal: boolean;
    length: number;
    bufferSize?: number;
    itemEstimateSize?: number;
  }) {
    this.length = length;
    this.bufferSize = this.getBufferSize(bufferSize, horizontal);
    this.isExactly = !!itemSize;
    this.getSize = this.initSizeGetter(itemSize || itemEstimateSize);
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

  public correctSize(options: {targetNode: HTMLElement; headerLength: number; pageIndexs: [number, number]; styleString: string}) {
    const {
      targetNode,
      headerLength,
      pageIndexs: [prePageIndex, nextPageIndex],
      styleString
    } = options;
    if (this.isExactly || this.isCorrecting) {
      return;
    }
    this.isCorrecting = true;
    const cellRoot = targetNode.parentNode;
    const heights = [];
    cellRoot.childNodes.forEach((child: HTMLElement) => heights.push(child.getBoundingClientRect()[styleString]));
    let errorSize = 0;
    let firstIndex = this.pages[prePageIndex].startIndex - headerLength - 1;
    for (let i = prePageIndex; i <= nextPageIndex; i++) {
      const page = this.pages[i];
      const height = heights.slice(page.startIndex - firstIndex, page.endIndex + 1 - firstIndex).reduce((prev, cur) => {
        return prev + cur;
      }, 0) / SizeAndPositionManager.pixelRatio;
      const pageErrorSize = height - page.endPos + page.startPos;
      page.startPos = errorSize + page.startPos;
      errorSize += pageErrorSize;
      page.endPos = errorSize + page.endPos;
    }
    for (let i = nextPageIndex + 1; i < this.pages.length; i ++) {
      this.pages[i].startPos += errorSize;
      this.pages[i].endPos += errorSize;
    };
    this.totalSize += errorSize;
    this.isCorrecting = false;
  }

  private calPageInfo(index: number, prevExtraSize: number) {
    let size = 0;
    while (index < this.length && size < this.bufferSize - prevExtraSize) {
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
      };
    }
    return (i) => {
      const size = itemSize(i);
      if (typeof size !== 'number') {
        console.error(`rax-recyclerview: ${i} 节点的 size 为 ${size}，不是 number 类型`);
        return 0;
      }
      return size;
    };
  }

  public calCurrent(scrollDistance: number): RenderInfo|void {
    if (this.isCorrecting) {
      return;
    }
    const distance = scrollDistance / SizeAndPositionManager.pixelRatio;
    const bufferFont = distance - this.bufferSize;
    const bufferEnd = distance + this.bufferSize * 2;

    // TODO 二分查找
    let prevPageIndex: number, nextPageIndex: number;
    for (let i = 0; i < this.pages.length; i ++) {
      if (this.pages[i].endPos > bufferFont) {
        prevPageIndex = i;
        break;
      }
    }
    if (prevPageIndex === undefined) {
      prevPageIndex = 0;
    }
    for (let i = prevPageIndex; i < this.pages.length; i++) {
      if (this.pages[i].endPos >= bufferEnd) {
        nextPageIndex = i;
        break;
      }
    }
    if (nextPageIndex === undefined) {
      nextPageIndex = this.pages.length - 1;
    }

    const prevPage = this.pages[prevPageIndex];
    const nextPage = this.pages[nextPageIndex];

    if (prevPage && nextPage) {
      return {
        pageIndexs: [prevPageIndex, nextPageIndex],
        placeholderSizes: [prevPage.startPos, this.totalSize - nextPage.endPos],
        renderedIndexs: [prevPage.startIndex, nextPage.endIndex]
      };
    }
    return {
      pageIndexs: [0, 0],
      placeholderSizes: [0, 0],
      renderedIndexs: [0, this.length - 1]
    };
  }
}

export default SizeAndPositionManager;