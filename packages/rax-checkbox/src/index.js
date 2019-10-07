import {Component, createElement, PropTypes} from 'rax';
import Image from 'rax-image';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import './index.css';

const CHECKED_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzLRwScAAAAPdFJOUwDvEI8wz69QQL/fIHCAYDHs4yUAAACoSURBVCjPfdIBDoMgDAXQ31JE1K33v60UZSJ2NjEmvvgpUIAD6aMoMMBR3YqMoBpmDDXbV1B5nApKUB3/kU9ZR1QLDcKklACPJmvCpWSSPWLbJK0e1bgNDrW4J/3iLmLbSov7oqNyjtFsM5nQUzyOc61xfKPlOOpsr4QbSb0x6uKuNqTdZovrmm+W8KDTJjhUbeGB5LS8SDcChV4GwB0bqWPzMmz/R3QHJwAPwC8jHWQAAAAASUVORK5CYII=';
const UNCHECKED_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUxpcTMzMzMzMzMzMzMzMzMzMzMzMzMzM2vW5DoAAAAHdFJOUwCPEO9AzzBOX/xUAAAASklEQVQoz+2SMRKAQAwCIcmF///YaKl4tYU7Q8O2CwRTD5IBxJJlBSixcKPOFzkzUAmpnGppFCy/+qpqZ2rUJgCbTV/ZbGJ7T/QAwyIE71akwQMAAAAASUVORK5CYII=';

class CheckBox extends Component {
  static defaultProps = {
    checked: false,
    checkedImage: CHECKED_ICON,
    uncheckedImage: UNCHECKED_ICON,
  };

  state = {
    checked: Boolean(this.props.checked)
  };

  onChange = () => {
    const {onChange} = this.props;
    const checked = !this.state.checked;
    this.setState({
      checked
    });
    if (onChange) {
      onChange(checked);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({
        checked: Boolean(nextProps.checked)
      });
    }
  }

  render() {
    let {
      checkedImage,
      uncheckedImage,
      containerStyle,
      checkboxStyle,
    } = this.props;

    let imageSource = this.state.checked ? checkedImage : uncheckedImage;
    if (typeof imageSource === 'string') {
      imageSource = {
        uri: imageSource
      };
    }

    return (
      <Touchable role="checkbox" aria-checked={this.state.checked} onPress={this.onChange} className="flexContainer">
        <View className="container" style={containerStyle}>
          <Image
            className="checkbox"
            style={checkboxStyle}
            source={imageSource} />
        </View>
      </Touchable>
    );
  }
}

export default CheckBox;
