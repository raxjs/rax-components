"use strict";
let dataSource = [
  { height: 550, item: {} },
  { height: 624, item: {} },
  { height: 708, item: {} },
  { height: 600, item: {} },
  { height: 300, item: {} },
  { height: 100, item: {} },
  { height: 400, item: {} },
  { height: 550, item: {} },
  { height: 624, item: {} },
  { height: 708, item: {} },
  { height: 600, item: {} },
  { height: 300, item: {} },
  { height: 100, item: {} },
  { height: 400, item: {} }
]
Page({
  data: {
    dataSource: dataSource
  },
  onAppear: function onAppear() {
    console.log("child appear");
  },
  loadMore: function() {
    console.log("load more");
    dataSource = dataSource.concat(dataSource);
    this.setData({dataSource});
  }
});