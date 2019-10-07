declare var Component: any

let count = 0;

Component({
  data: {
    modalOpened: false
  },
  props: {
  },
  didMount: function didMount() {
  },
  methods: {
    show() {
      this.setData({
        modalOpened: true
      });
    },
    hide() {
      this.setData({
        modalOpened: false
      });
    }
  }
});