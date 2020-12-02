import { createElement, Component } from 'rax';
import PropTypes from 'prop-types';
import Text from 'rax-text';
import View from 'rax-view';
import Image from 'rax-image';
import './index.css';

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

function Time(props) {
  const { num, timeWrapStyle, timeBackground, timeBackgroundStyle, timeStyle, secondStyle } = props;
  let displayNum = num.toString();
  if (num < 0) {
    displayNum = '00';
  } else if (num < 10) {
    displayNum = '0' + num;
  }

  const numList = displayNum.split('');
  const numListLength = numList.length - 1;
  return <View className="rax-countdown-item" style={timeWrapStyle}>
    {
      timeBackground ?
        <Image className="rax-countdown-background" source={timeBackground} style={timeBackgroundStyle} /> :
        null
    }
    {
      numList.map((time, index) => <Text key={`time_${index}`} style={index === numListLength ? secondStyle : timeStyle}>{time}</Text>)
    }
  </View>;
};

class Index extends Component {
  state = {
    timeRemaining: 0
  };

  timeoutId = 0;

  static propTypes = {
    formatFunc: PropTypes.func,
    onTick: PropTypes.func,
    onComplete: PropTypes.func,
    tpl: PropTypes.string, // template (example {h}:{m}:{s})
    timeRemaining: PropTypes.number,
    secondStyle: PropTypes.object,
    timeStyle: PropTypes.object, // style for num
    textStyle: PropTypes.object, // style for text
    timeWrapStyle: PropTypes.object,
    timeBackground: PropTypes.shape({
      uri: PropTypes.string
    }),
    timeBackgroundStyle: PropTypes.object,
    interval: PropTypes.number
  };

  static defaultProps = {
    tpl: '{d}天{h}时{m}分{s}秒',
    timeRemaining: 0,
    interval: 1000
  };

  componentWillMount() {
    const {timeRemaining} = this.props;
    this.setState({
      timeRemaining: timeRemaining
    });
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    this.tick();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.timeRemaining !== this.props.timeRemaining) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.setState({
        timeRemaining: newProps.timeRemaining
      });
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.timeRemaining !== nextProps.timeRemaining ||
      this.state.timeRemaining !== nextState.timeRemaining;
  }

  tick = () => {
    const {onComplete, onTick, interval} = this.props;
    const {timeRemaining} = this.state;
    const countdownComplete = 1000 > timeRemaining;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (countdownComplete && isFunction(onComplete)) {
      onComplete();
    } else {
      this.timeoutId = !countdownComplete ? setTimeout(
        () => this.setState(
          {
            timeRemaining: timeRemaining - interval
          },
          () => isFunction(onTick) && onTick(timeRemaining)),
        interval
      ) : false;
    }
  };

  render() {
    const {timeRemaining} = this.state;
    const {
      formatFunc,
      timeStyle,
      timeBackgroundStyle,
      timeWrapStyle,
      timeBackground,
      secondStyle,
      textStyle,
      tpl
    } = this.props;
    if (formatFunc) {
      return formatFunc(timeRemaining);
    }

    const totalSeconds = Math.floor(timeRemaining / 1000);
    let days = parseInt(totalSeconds / 3600 / 24);
    let hours = parseInt(totalSeconds / 3600) % 24;
    let minutes = parseInt(totalSeconds / 60) % 60;
    let seconds = parseInt(totalSeconds % 60);

    const timeType = {
      'd': days,
      'h': hours,
      'm': minutes,
      's': seconds
    };

    let rule = new RegExp('\{[d,h,m,s]\}', 'g'); // used to matched all template item, which includes 'd', 'h', 'm' and 's'.

    // Turn {d}-{h}-{m}-{s} to [0, 0, 4, 4, 8, 8, 12, 12, -1]
    const matchlist = [];
    let tmp = null;
    while ( (tmp = rule.exec(tpl)) !== null ) {
      matchlist.push(tmp.index, tmp.index);
    }
    if (matchlist.length !== 0) {// used to detect the last element
      matchlist.push(-1);
    }
    let lastPlaintextIndex = 0;

    return <View className="rax-countdown-main">
      {
        matchlist.map((val, index) => {
          if (val === -1) {// don't forget the potential plain text after last matched item
            const lastPlaintext = tpl.slice(lastPlaintextIndex);
            return lastPlaintext ? (
              <Text style={textStyle} key={`text_${index}`}>{lastPlaintext}</Text>
            ) : null;
          }

          const matchedCharacter = tpl[val + 1];
          switch (matchedCharacter) {
            case 'd':
            case 'h':
            case 'm':
            case 's':
              if (index % 2 === 0) {
                // Insert plain text before current matched item
                // eg. in `{d}-{h}`:  text before `{d}` is ``, text before `{h}` is `-`
                const preText = tpl.slice(lastPlaintextIndex, val);
                // Do not generate text node if there is no preText
                return preText ? <Text style={textStyle} key={`text_${index}`}>{preText}</Text> : null;
              } else {// replace current matched item to realtime string
                lastPlaintextIndex = val + 3;
                return <Time
                  num={timeType[matchedCharacter]}
                  timeWrapStyle={timeWrapStyle}
                  timeBackground={timeBackground}
                  timeBackgroundStyle={timeBackgroundStyle}
                  timeStyle={timeStyle}
                  secondStyle={secondStyle}
                  key={`time_${index}`}
                />;
              }
            default:
              return null;
          }
        })
      }
    </View>;
  }
}


export default Index;
