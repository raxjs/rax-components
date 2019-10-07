Page({
  onClick(e) {
    console.log(e.target);
    my.alert({ title: 'click success' });
  },
  onAppear() {
    console.log('child appear');
  },
  swiperChange(e) {
    console.log(e);
  },
});
