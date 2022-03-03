import { ScrollViewProps } from 'rax-scrollview';
import { RefAttributes, HTMLAttributes, ForwardRefExoticComponent } from 'rax';

export type TItemSize = number | ((e: number) => number);

export interface RecyclerViewRefObject extends ScrollViewProps {
  itemSize?: TItemSize;
  totalSize?: number;
  bufferSize?: number;
  horizontal: boolean;
  bufferRatio?: number;
  scrollEventThrottle?: number;
  itemEstimateSize?: number;
}

export interface LegacyRefObject extends RefAttributes<any>, HTMLAttributes<HTMLDivElement> {}

export interface VirtualizedList extends ForwardRefExoticComponent<RecyclerViewRefObject> {
  Header?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>> | Rax.NamedExoticComponent<object>;
  Cell?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>> | Rax.NamedExoticComponent<object>;
  NestedList?: Rax.MemoExoticComponent<ForwardRefExoticComponent<LegacyRefObject>>;
}