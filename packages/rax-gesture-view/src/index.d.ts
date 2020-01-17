import { Component } from 'rax';

export interface GestureViewProps {
  onHorizontalPan?: (e) => void;
  onVerticalPan?: (e) => void;
}

declare class GestureView extends Component<GestureViewProps, any> {
  public render: () => JSX.Element
}

export default GestureView;
