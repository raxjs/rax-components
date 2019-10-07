let count = 0;
const DEFAULT_TPL = '{d}天{h}时{m}分{s}秒';

Component({
  data: {
  },
  props: {
    timeRemaining: 0,
    interval: 1000,
    timeWrapStyle: '',
    textStyle: '',
    timeStyle: '',
    secondStyle: '',
    tpl: '{d}天{h}时{m}分{s}秒',
    onFormatFunc: null,
    onTick: null,
    onComplete: null
  },
  didMount: function didMount() {
    const funcToExecute = this.props.onFormatFunc && typeof this.props.onFormatFunc === 'function'
      ? this.props.onFormatFunc : this.msToTime;
    this.funcToExecute = funcToExecute.bind(this);

    this.counter = setInterval(() => {
      this.funcToExecute();
    }, this.props.interval);
  },
  methods: {
    msToTime() {
      const timeDuration = this.props.timeRemaining - count * this.props.interval;
      count++;

      if (!timeDuration || timeDuration <= 0) {
        if (this.counter) clearInterval(this.counter);
      }

      var seconds = parseInt(timeDuration / 1000 % 60),
        minutes = parseInt(timeDuration / (1000 * 60) % 60),
        hours = parseInt(timeDuration / (1000 * 60 * 60) % 24),
        days = parseInt(timeDuration / (1000 * 60 * 60 * 24));

      days = days < 10 ? '0' + days : days;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      const timeType = {
        'd': days,
        'h': hours,
        'm': minutes,
        's': seconds
      };

      // format time
      const tpl = this.props.tpl || DEFAULT_TPL;
      const rule = new RegExp('\{[d,h,m,s]\}', 'g'); // used to matched all template item, which includes 'd', 'h', 'm' and 's'.
      let matchlist = [];
      let tmp = null;
      let { textStyle, timeWrapStyle } = this.props;

      while ((tmp = rule.exec(tpl)) !== null) {
        matchlist.push(tmp.index, tmp.index);
      }

      if (matchlist.length !== 0) {
        // used to detect the last element
        matchlist.push(-1);
      }

      let lastPlaintextIndex = 0;
      let parsedTime = matchlist.map((val, index) => {
        if (val === -1) {
          // don't forget the potential plain text after last matched item
          let lastPlaintext = tpl.slice(lastPlaintextIndex);
          return {
            value: lastPlaintext,
            style: textStyle
          };
        }

        let matchedCharacter = tpl[val + 1];

        switch (matchedCharacter) {
          case 'd':
          case 'h':
          case 'm':
          case 's':
            if (index % 2 === 0) {
              // insert plain text before current matched item
              return {
                value: tpl.slice(lastPlaintextIndex, val),
                style: textStyle
              };
            } else {
              // replace current matched item to realtime string
              lastPlaintextIndex = val + 3;
              return {
                value: this.splitTime(timeType[matchedCharacter]),
                style: timeWrapStyle,
                isTime: true
              };
            }
          default:
            return null;
        }
      });

      parsedTime = parsedTime.filter((item) => item);

      // check if the onTick function needs to be called
      const callOnTick = this.props.onTick && typeof this.props.onTick === 'function';

      this.setData({
        parsedTime
      }, callOnTick ? this.props.onTick : null);

      // check if onComplete function needs to be called
      if (timeDuration <= 0 &&
        this.props.onComplete && typeof this.props.onComplete === 'function') {
        this.props.onComplete();
      }
    },
    splitTime(time = '00') {
      if (typeof time !== 'string') {
        time = time.toString();
      }

      return time.split('');
    }
  }
});