import { createElement, Component } from 'rax';
import View from 'rax-view';
import { GestureViewProps, PanEvent, PanType } from './types';

const touchActionRatio = 1 / 1;

class GestureViewOnWeb extends Component<GestureViewProps> {
  private startX = 0;

  private startY = 0;

  private isStartX = false;

  private isStartY = false;

  private maxDy = 0;

  private maxDx = 0;

  private panType: PanType = 'x';
  private isPropagationStoppedX: boolean;
  private isPropagationStoppedY: boolean;

  private onTouchStart = (e: PanEvent) => {
    this.startX = e.changedTouches[0].clientX;
    this.startY = e.changedTouches[0].clientY;
  };

  private reset() {
    this.startX = undefined;
    this.startY = undefined;
    this.maxDy = 0;
    this.maxDx = 0;
    this.isStartX = false;
    this.isStartY = false;
    this.panType = 'x';
    this.isPropagationStoppedX = false;
    this.isPropagationStoppedY = false;
  }

  private onTouchMove = (e: PanEvent) => {
    let { onHorizontalPan, onVerticalPan, threshold = 5 } = this.props;
    let deltaX = e.changedTouches[0].clientX - this.startX;
    let deltaY = e.changedTouches[0].clientY - this.startY;

    this.maxDx = Math.max(Math.abs(deltaX), this.maxDx);
    this.maxDy = Math.max(Math.abs(deltaY), this.maxDy);

    if (this.isPropagationStoppedX || this.isPropagationStoppedY) {
      e.stopPropagation();
    }

    // horizontal pan
    if (
      onHorizontalPan &&
      Math.abs(deltaX) >= threshold &&
      Math.abs(deltaY / deltaX) < touchActionRatio
    ) {
      e.preventDefault();
      this.isPropagationStoppedX = true;
      this.panType = 'x';
      if (!this.isStartX) {
        e.state = 'start';
        e.changedTouches[0].deltaX = deltaX;
        this.isStartX = true;
      } else {
        e.state = 'move';
        e.changedTouches[0].deltaX = deltaX;
      }
      onHorizontalPan && onHorizontalPan(e);
    } else if (
      onVerticalPan &&
      Math.abs(deltaY) >= threshold &&
      Math.abs(deltaX / deltaY) < touchActionRatio
    ) {
      e.preventDefault();
      this.isPropagationStoppedY = true;
      this.panType = 'y';
      if (!this.isStartY) {
        e.state = 'start';
        e.changedTouches[0].deltaY = deltaY;
        this.isStartY = true;
      } else {
        e.state = 'pan';
        e.changedTouches[0].deltaY = deltaY;
      }
      onVerticalPan && onVerticalPan(e);
    }
  };

  private onTouchEnd = (e: PanEvent) => {
    let { onHorizontalPan, onVerticalPan } = this.props;
    e.state = 'end';
    e.changedTouches[0].deltaX = e.changedTouches[0].clientX - this.startX;
    e.changedTouches[0].deltaY = e.changedTouches[0].clientY - this.startY;
    if (this.panType == 'x') {
      onHorizontalPan && onHorizontalPan(e);
    } else if (this.panType == 'y') {
      onVerticalPan && onVerticalPan(e);
    }
    this.reset();
  };

  private onTouchCancel = (e: PanEvent) => {
    let { onHorizontalPan, onVerticalPan } = this.props;
    e.state = 'cancel';
    e.changedTouches[0].deltaX = e.changedTouches[0].clientX - this.startX;
    e.changedTouches[0].deltaY = e.changedTouches[0].clientY - this.startY;
    if (this.panType == 'x') {
      onHorizontalPan && onHorizontalPan(e);
    } else if (this.panType == 'y') {
      onVerticalPan && onVerticalPan(e);
    }
    this.reset();
  };

  public render() {
    return (
      <View
        {...this.props}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onTouchCancel={this.onTouchCancel}
      />
    );
  }
}

export default GestureViewOnWeb;
