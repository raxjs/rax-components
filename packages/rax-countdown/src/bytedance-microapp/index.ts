import { DEFAULT_TPL } from '../utils';
const formatObjStyleToString = (obj) => {
  let res = '';
  Object.keys(obj).forEach(item => {
    res = res + item.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`) + ': ' + obj[item] + ';';
  });
  return res;
};

Component({
  data: {
    count: 0
  },
  properties: {
    timeRemaining: {
      type: Number,
      value: 0
    },
    interval: {
      value: 1000,
      type: Number
    },
    tpl: {
      value: '{d}天{h}时{m}分{s}秒',
      type: String
    },
    onFormatFunc: {
      value: null,
      type: Function
    },
    onTick: {
      value: null,
      type: Function
    },
    onComplete: {
      value: null,
      type: Function
    },
    timeStyle: {
      value: {},
      type: Object
    },
    secondStyle: {
      value: {},
      type: Object
    },
    textStyle: {
      value: {},
      type: Object
    },
    timeWrapStyle: {
      value: {},
      type: Object
    },
    timeBackground: {
      value: {},
      type: Object
    },
    timeBackgroundStyle: {
      value: {},
      type: Object
    }

  },
  attached: function attached() {
    this.setData({
      _timeStyle: formatObjStyleToString(this.data.timeStyle),
      _secondStyle: formatObjStyleToString(this.data.secondStyle),
      _textStyle: formatObjStyleToString(this.data.textStyle),
      _timeWrapStyle: formatObjStyleToString(this.data.timeWrapStyle),
      _timeBackground: formatObjStyleToString(this.data.timeBackground),
      _timeBackgroundStyle: formatObjStyleToString(this.data.timeBackgroundStyle)
    });
    const funcToExecute = this.data.onFormatFunc && typeof this.data.onFormatFunc === 'function'
      ? this.data.onFormatFunc : this.msToTime;
    this.funcToExecute = funcToExecute.bind(this);

    this.counter = setInterval(() => {
      this.funcToExecute();
    }, this.data.interval);
  },
  methods: {
    msToTime() {
      const { count } = this.data;
      const timeDuration = this.data.timeRemaining - count * this.data.interval;
      this.setData({
        count: count + 1
      });

      if (!timeDuration || timeDuration <= 0) {
        if (this.counter) clearInterval(this.counter);
      }

      let seconds = timeDuration / 1000 % 60,
        minutes = timeDuration / (1000 * 60) % 60,
        hours = timeDuration / (1000 * 60 * 60) % 24,
        days = timeDuration / (1000 * 60 * 60 * 24);

      const timeType = {
        'd': days < 10 ? '0' + days : days + '',
        'h': hours < 10 ? '0' + hours : hours + '',
        'm': minutes < 10 ? '0' + minutes : minutes + '',
        's': seconds < 10 ? '0' + seconds : seconds + ''
      };

      // format time
      const tpl = this.data.tpl || DEFAULT_TPL;
      const rule = new RegExp('\{[d,h,m,s]\}', 'g'); // used to matched all template item, which includes 'd', 'h', 'm' and 's'.
      let matchlist = [];
      let tmp = null;
      let { _textStyle, _timeWrapStyle } = this.data;

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
            style: _textStyle
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
                style: _textStyle
              };
            } else {
              // replace current matched item to realtime string
              lastPlaintextIndex = val + 3;
              return {
                value: this.splitTime(timeType[matchedCharacter]),
                style: _timeWrapStyle,
                isTime: true
              };
            }
          default:
            return null;
        }
      });

      parsedTime = parsedTime.filter((item) => item);

      // check if the onTick function needs to be called
      const callOnTick = this.data.onTick && typeof this.data.onTick === 'function';

      this.setData({
        parsedTime
      }, callOnTick ? this.data.onTick : null);

      // check if onComplete function needs to be called
      if (timeDuration <= 0 &&
        this.data.onComplete && typeof this.data.onComplete === 'function') {
        this.data.onComplete();
      }
    },
    splitTime(time = '00') {
      return time.split('');
    }
  }
});
