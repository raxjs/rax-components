/** @jsx createElement */

import {createElement, createRef} from 'rax';
import BaseView from './BaseView';
import View from 'rax-view';
import {FULL_WIDTH} from '../Constant';
import Panel from '../Panel';
import Util from '../Util';
import findDOMNode from 'rax-find-dom-node';

const {clamp, isLoop, noop} = Util;

let DOM = null;

try {
  DOM = require('@weex-module/dom');
} catch (err) {

}


class ListView extends BaseView {
  constructor(props) {
    super(props);
    this.container = createRef();
    this.placeholder = createRef();
    this.indicator = createRef();
  }

  switchTo(loopIndex, options = {params: {}, ignoreEvent: false}) {
    let {beforeSwitch = noop, loop} = this.props;
    loop = isLoop(loop);

    if (!loop) {
      loopIndex = clamp(loopIndex, 0, this.itemCount - 1);
    }

    let {startIndexes} = this.computeSize({loopIndex});
    let index = ((loopIndex - startIndexes.length) % this.itemCount + this.itemCount) % this.itemCount;
    let {params} = options;
    let prevIndex = this.curIndex;
    let prevLoopIndex = this.loopIndex;
    this.move(loopIndex);

    if (!options.ignoreEvent) {
      beforeSwitch({index, loopIndex, prevLoopIndex, params, prevIndex});
    }

    this.curIndex = index;
    this.loopIndex = loopIndex;
    this._scrollToIndex(index);
  }

  _scrollToIndex(index) {
    let card = findDOMNode(this.refs[`card_${index}`]);
    if (card && card.ref && DOM) {
      DOM.scrollToElement(card.ref, {
        offset: 0,
        animated: true
      });
    }
  }

  onScrollEnd = (e) => {
    let {afterSwitch = noop, vertical, cardSize} = this.props;
    let prevIndex = this.curIndex;
    let prevLoopIndex = this.loopIndex;
    let offset = vertical ? e.contentOffset.y : e.contentOffset.x;
    let index = Math.round(Math.abs(offset / cardSize));

    this.loopIndex = index;
    this.curIndex = index;
    // indicator
    if (this.indicator.current && this.indicator.current.switchTo) {
      this.indicator.current.switchTo(index);
    }
    afterSwitch({index, loopIndex: index, prevLoopIndex, prevIndex});
  }

  render() {
    let {vertical, indicatorStyle, indicatorItemStyle, children, indicatorActiveItemStyle, defaultIndex} = this.props;

    if (!(children instanceof Array)) {
      children = [children];
    }

    let {cardSize, viewportSize, indexes, panels, startIndexes} = this.computeSize();

    let defaultLoopIndex = defaultIndex + startIndexes.length;

    let containerStyle = vertical ? {height: viewportSize} : {width: viewportSize};


    return (<View>
      <list {...this.props} ref={this.container}
        style={{...containerStyle, ...this.props.style, opacity: 1}}
        scrollDirection={vertical ? 'vertical' : 'horizontal'}
        onDisappear={this.onDisappear}
        onAppear={this.onAppear}
        showScrollbar={false}
        pagingEnabled={true}
        onScrollEnd={this.onScrollEnd}
      >
        <cell ref={this.placeholder} />
        {indexes.map((index, loopIndex) => {
          let child = children[index];
          if (child && child.type === Panel) {
            let cardStyle = this.getCardInitialStyle(loopIndex === defaultLoopIndex);
            let posStyles = vertical ? {
              width: FULL_WIDTH,
              height: cardSize,
            } : {
              width: cardSize,
            };
            return (<cell key={loopIndex}>
              <Panel ref={`card_${loopIndex}`} {...child.props}
                cardSize={cardSize}
                viewportSize={viewportSize}
                loopIndex={loopIndex}
                index={index}
                data-ref={`card_${loopIndex}`}
                style={{...child.props.style, ...posStyles, ...cardStyle}}
              />
            </cell>);
          }
        })}

      </list>
      {this.props.indicatorComponent ?
        <this.props.indicatorComponent
          ref={this.indicator}
          panels={panels}
          style={indicatorStyle}
          itemStyle={indicatorItemStyle}
          activeItemStyle={indicatorActiveItemStyle}
        /> : null}
    </View>);
  }
}

export default ListView;