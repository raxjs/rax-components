import {Component, createElement} from 'rax';
import {isWeex} from 'universal-env';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import './index.css';

class Button extends Component {
  static propTypes = {};

  render() {
    const props = this.props;
    const textStyles = {};
    let buttonClassName = 'text';

    if (props.color) {
      textStyles.color = props.color;
    }

    if (props.disabled) {
      buttonClassName += ' textDisabled';
    }

    let content = props.children || props.title;
    if (typeof content === 'string') {
      content = <Text className={buttonClassName} style={textStyles}>{content}</Text>;
    }

    return (
      <Touchable role="button" {...props}>
        {content}
      </Touchable>
    );
  }
}

export default Button;
