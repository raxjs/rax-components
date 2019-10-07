/** @jsx createElement */
import {createElement, render, useRef} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import DU from 'driver-universal';
import Slider from '../src/index';
import ScrollView from 'rax-scrollview';
import animate from 'universal-animation';
import findDOMNode from 'rax-find-dom-node';
import {isWeb} from 'universal-env';

if (isWeb) {
  document.body.style.margin = 0;
}

const styles = {
  item: {
    height: 400,
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 5,
    borderColor: '#000'
  },
  panView: {
    height: 400,
    justifyContent: 'center'
  },
  txt: {
    color: '#fff',
    fontSize: 50,
    textAlign: 'center'
  },
  title: {
    backgroundColor: '#f7f7f7',
    color: '#444',
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 80
  }
};

const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'yellow'
];

const App = () => {
  const pagination = useRef(null); 
  const bgList = Array.apply(null, {length: colors.length}).map(() => useRef(null));
  const getCardTransitionSpec = () => {
    return {
      props: [
        {
          property: 'transform.scale',
          inputRange: [0, 1],
          outputRange: [0.8, 1]
        },
        {
          property: 'opacity',
          inputRange: [0, 1],
          outputRange: [.2, 1]
        }
      ]
    };
  }
  return (
      <Slider>
        {colors.map((color, i) => {
          return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
            <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
          </Slider.Panel>);
        })}
      </Slider>
    );
} 

render(<App />, document.body, { driver: DU });
