import { ScrollViewProps } from 'rax-scrollview';
import { RaxNode, RefAttributes, HTMLAttributes, ForwardRefExoticComponent } from 'rax';

export type TItemSize = number | ((e: number) => number);

export interface RecyclerViewRefObject extends ScrollViewProps {
  itemSize: TItemSize;
  totalSize?: number;
  children: RaxNode[];
  bufferSize?: number;
  horizontal: boolean;
  bufferRatio?: number;
}

export interface LegacyRefObject extends RefAttributes<any>, HTMLAttributes<HTMLDivElement> {}

export interface VirtualizedList extends ForwardRefExoticComponent<RecyclerViewRefObject> {
  Header?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
  Cell?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
  NestedList?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
}