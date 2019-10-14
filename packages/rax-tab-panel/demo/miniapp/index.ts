Page({
  data: {
    tabs: [
      'blue',
      'yellow',
      'green',
      'red',
      'pink'
    ]    
  },
  beforeUpperTabSwitch() {
    console.log('tab is going to switch')
  },
  afterUpperTabSwitch() {
    console.log('tab has been switched')
  },
  onViewAppear(e) {
    const id = e.target.dataset.id;
    console.log(id + ' panel appear')
  },
  onViewDisAppear(e) {
    const id = e.target.dataset.id;
    console.log(id + ' panel disappear')
  },
  onViewFirstAppear(e) {
    const id = e.target.dataset.id;
    console.log(id + ' panel first appear')
  }
});
