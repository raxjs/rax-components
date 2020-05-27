import { TouchList, TouchEvent, Touch } from 'rax';

export interface GestureViewProps {
  onHorizontalPan?: (e: PanEvent) => void;
  onVerticalPan?: (e: PanEvent) => void;
  threshold?: number;
}

export type PanType = 'x' | 'y';

export interface PanEvent extends TouchEvent {
  changedTouches: PanList;
  state?: 'start' | 'move' | 'cancel' | 'pan' | 'end';
}

interface PanList extends TouchList {
  [index: number]: Pan;
  item(index: number): Pan;
}

interface Pan extends Touch {
  deltaX?: number;
  deltaY?: number;
}
