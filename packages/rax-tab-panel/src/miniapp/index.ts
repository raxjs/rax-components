let x1 = 0;
let currentPos = 0;

Component({
  data: {
    slideDistance: 0,
    currentTabIndex: 0
  },
  props: {
    className: '',
    style: '',
    dataSource: [],
    tabItemClass: '',
    duration: 500,
    tabItemActiveClass: '',
    isPanEnabled: true,
    panDist: 50,
    beforeSwitch: '',
    afterSwitch: '',
    onSwitch: ''
  },
  didMount: function didMount() {
    if (this.props.defaultFocusIndex
      && typeof this.props.defaultFocusIndex === 'number'
      && this.props.defaultFocusIndex < this.props.dataSource.length) {
      const currentTabIndex = this.props.defaultFocusIndex;
      currentPos = -(750 * currentTabIndex);
      this.scrollTo(currentTabIndex);
    }
  },
  methods: {
    touchStart(e) {
      if (!this.props.isPanEnabled) return;
      x1 = e.changedTouches[0].pageX;
    },
    touchEnd(e) {
      if (!this.props.isPanEnabled) return;

      const limit = (this.props.dataSource.length - 1) * 750;
      let currentTabIndex = this.data.currentTabIndex;

      let x2 = e.changedTouches[0].pageX;
      const { panDist } = this.props;

      // touch left
      if (x2 - x1 < -panDist) {
        currentTabIndex = currentPos === -limit ? currentTabIndex : currentTabIndex + 1;
        currentPos = currentPos === -limit ? currentPos : currentPos - 750;
      // touch right
      } else if (x2 - x1 > panDist) {
        currentTabIndex = currentPos === 0 ? currentTabIndex : currentTabIndex - 1;
        currentPos = currentPos === 0 ? currentPos : currentPos + 750;
      }

      this.scrollTo(currentTabIndex);
    },
    touchScroll(e) {
      let currentTabIndex = this.data.currentTabIndex;
      const scrollToIndex = e.target.dataset.index;
      const deviation = (currentTabIndex - scrollToIndex) * 750;

      currentPos += deviation;

      this.scrollTo(scrollToIndex);
    },
    scrollTo(tabIndex) {
      const executeHooks = tabIndex != this.data.currentTabIndex ? true : false;
      if (executeHooks
        && this.props.beforeSwitch
        && this.$page[this.props.beforeSwitch]
        && typeof this.$page[this.props.beforeSwitch] === 'function')
        this.$page[this.props.beforeSwitch]();

      this.setData({
        slideDistance: `${currentPos}rpx`,
        currentTabIndex: tabIndex
      }, () => {
        if (executeHooks
          && this.props.afterSwitch
          && this.$page[this.props.afterSwitch]
          && typeof this.$page[this.props.afterSwitch] === 'function')
          this.$page[this.props.afterSwitch]();
      });
    }
  }
});