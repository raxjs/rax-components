Page({
  data: {
    text: '',
  },
  onChange(e) {
    this.setData({
      text: `onChange: ${e.detail.value}`
    });
  },
  onChangeText(text) {
    this.setData({
      text: `onChangeText: ${text}`
    });
  },
  onBlur() {
    this.setData({
      text: 'onBlur'
    });
  },
  onFocus() {
    this.setData({
      text: 'onFocus'
    });
  }
});
