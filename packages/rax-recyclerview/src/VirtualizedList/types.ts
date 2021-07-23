import { ScrollViewProps } from 'rax-scrollview';
import { RaxNode, RefAttributes, HTMLAttributes } from 'rax';

export type TItemSize = number | ((e: number) => number);

export interface RecyclerViewRefObject extends ScrollViewProps {
  itemSize: TItemSize;
  children: RaxNode[];
  size?: number;
  horizontal: boolean;
}

export interface LegacyRefObject extends RefAttributes<any>, HTMLAttributes<HTMLDivElement> {}