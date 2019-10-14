Page({
  data: {
    modalOpened: false,
  },
  modalRef(ref) {
    this.modal = ref;
  },
  showModal() {
    if(my.canIUse('component2')) {
      this.modal.show();
    } else {
      console.log('Your compiler does not support component2');
    }
  },
  hideModal() {
    if(my.canIUse('component2')) {
      this.modal.hide();
    } else {
      console.log('Your compiler does not support component2');
    }
  }
});
