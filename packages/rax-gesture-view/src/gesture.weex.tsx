import { createElement, Component } from 'rax';
import View from 'rax-view';
import { GestureViewProps, PanEvent } from './types';

class GestureViewOnWeex extends Component<GestureViewProps> {
  private startX = 0;
  private onTouchStart = (e: PanEvent) => {
    this.startX = e.changedTouches[0].clientX;
  };
  private onHorizontalPan = (e: PanEvent) => {
    let { onHorizontalPan } = this.props;
    e.changedTouches[0].deltaX = e.changedTouches[0].clientX - this.startX;
    onHorizontalPan && onHorizontalPan(e);
  };
  public render() {
    return (
      <View
        {...this.props}
        onTouchStart={this.onTouchStart}
        onHorizontalPan={this.onHorizontalPan}
      />
    );
  }
}

export default GestureViewOnWeex;
