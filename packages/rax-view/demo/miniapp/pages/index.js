Page({
  data: {
    animationInfo: null
  },
  onShow() {
    var animation = my.createAnimation({
      duration: 1000,
      timeFunction: 'ease-in-out'
    });

    this.animation = animation;

    animation
      .scale(3, 3)
      .rotate(60)
      .step();

    this.setData({
      animationInfo: animation.export()
    });

    setTimeout(
      function() {
        animation.translate(35).step();
        this.setData({
          animationInfo: animation.export()
        });
      }.bind(this),
      1500
    );
  },
  rotateAndScale() {
    // rotate and scale
    this.animation
      .rotate(60)
      .scale(3, 3)
      .step();
    this.setData({
      animationInfo: this.animation.export()
    });
  },
  rotateThenScale() {
    // rotate and scale
    this.animation.rotate(60).step();
    this.animation.scale(3, 3).step();
    this.setData({
      animationInfo: this.animation.export()
    });
  },
  rotateAndScaleThenTranslate() {
    // rotate and scale,then translate
    this.animation
      .rotate(60)
      .scale(3, 3)
      .step();
    this.animation.translate(100, 100).step({ duration: 2000 });
    this.setData({
      animationInfo: this.animation.export()
    });
  },
  onClick(e) {
    my.alert({ title: 'click success' });
  },
  onAppear() {
    console.log('child appear');
  }
});
