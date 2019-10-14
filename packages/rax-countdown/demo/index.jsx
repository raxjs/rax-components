import { createElement, render, Component } from 'rax';
import View from 'rax-view';
import Countdown from '../src/index';
import DU from 'driver-universal';

class App extends Component {
  onComplete() {
    console.log('countdown complete');
  }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Countdown
            timeRemaining={100000}
            tpl={'{d}天{h}时{m}分{s}秒'}
            onComplete={this.onComplete}
          />
        </View>
        <View style={styles.container}>
          <Countdown
            timeRemaining={100000000}
            timeStyle={{
              'color': '#007457',
              'backgroundColor': 'red',
              'marginLeft': '2rpx',
              'marginRight': '2rpx'
            }}
            secondStyle={{'backgroundColor': 'yellow'}}
            textStyle={{'backgroundColor': 'blue'}}
            tpl={'{d}-{h}-{m}-{s}'}
            onComplete={this.onComplete}
          />
        </View>
        <View style={styles.container}>
          <Countdown
            timeRemaining={500000}
            tpl="{h}:{m}:{s}"
            timeStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            secondStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            timeWrapStyle={{
              borderRadius: 6,
              width: 50,
              height: 60,
              backgroundColor: '#333333',
            }}
          />
        </View>
        <View style={styles.container}>
          <Countdown
            timeRemaining={500000}
            tpl="{h}:{m}:{s}"
            timeStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            secondStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            timeBackground={{
              uri: 'https://gw.alicdn.com/tfs/TB1g6AvPVXXXXa7XpXXXXXXXXXX-215-215.png'
            }}
            timeBackgroundStyle={{
              width: 50,
              height: 80
            }}
          />
        </View>
      </View>
    );
  }
}

let styles = {
  root: {
    width: 750,
    paddingTop: 20
  },
  container: {
    padding: 20,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
};

render(<App />, document.body, { driver: DU });