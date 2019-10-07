'use strict';
import fmtEvent from './fmtEvent';

Component({
  data: {
    columns: []
  },
  props: {
    onEndReached: () => { },
    endReachedThreshold: 500,
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