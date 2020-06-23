'use strict';
import fmtEvent from './fmtEvent';

Component({
  data: {
    columns: [],
    scrollY: 0,
    scrollX: 0,
    scrollWithAnimation: true,
    scrollAnimationDuration: 400,
  },
  props: {
    onEndReached: () => { },
    onEndReachedThreshold: 500,
    columnWidth: '750rpx',
    columnCount: 1,
    dataSource: [],
    leftGap: 0,
    rightGap: 0
  },
  didMount: function didMount() {
    this.update();
  },
  didUpdate: function didUpdate() {
    this.update();
  },
  methods: {
    onEndReached(e) {
      if (typeof this.props.onEndReached == 'function') {
        var event = fmtEvent(this.props, e);
        this.props.onEndReached(event);
      }
    },
    scrollTo(param) {
      const { x = 0, y = 0, animated = true, duration = 400 } = param || {};
      this.setData({
        scrollY: y,
        scrollX: x,
        scrollWithAnimation: animated,
        scrollAnimationDuration: duration,
      });
    },
    update() {
      let columns = this.getColunms(this.props.dataSource, this.props.columnCount);
      this.setData({ columns });
    },
    getColunms(dataSource, columnCount) {
      let columns = [];
      let moduleHeights = [];

      for (let i = 0; i < columnCount; i++) {
        columns[i] = [];
        moduleHeights[i] = 0;
      }

      dataSource && dataSource.forEach((item, i) => {
        let targetColumnIndex = 0;
        let minHeight = moduleHeights[0];

        for (let j = 0; j < columnCount; j++) {
          if (moduleHeights[j] < minHeight) {
            minHeight = moduleHeights[j];
            targetColumnIndex = j;
          }
        }

        moduleHeights[targetColumnIndex] += item.height;
        columns[targetColumnIndex].push(item);
      });
      return columns;
    }
  }
});
