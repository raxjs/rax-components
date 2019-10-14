/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jsx createElement
 */
import { createElement, render, useRef } from 'rax';
import View from 'rax-view';
import DU from 'driver-universal';
import Text from 'rax-text';
import ScrollView from '../src/index';

function Thumb() {
  return <View style={styles.button}>
    <View style={styles.box} />
  </View>;
}

let THUMBS = [];
for (let i = 0; i < 20; i++) THUMBS.push(i);
let createThumbRow = (val, i) => <Thumb key={i} />;

function App() {
  const horizontalScrollViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  return <View style={styles.root}>
    <View style={styles.container}>
      <ScrollView
        ref={horizontalScrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          console.log(e);
        }}
      >
        {THUMBS.map(createThumbRow)}
      </ScrollView>
      <View
        style={styles.button}
        onClick={() => horizontalScrollViewRef.current.scrollTo({x: 0})}>
        <Text>Scroll to start</Text>
      </View>
    </View>
    <View style={{...styles.container, flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          console.log(e);
        }}
      >
        <View>
          <View style={styles.sticky}>
            <Text>Cannot sticky</Text>
          </View>
        </View>
        <View style={styles.sticky}>
          <Text>Sticky view must in ScrollView root</Text>
        </View>
        {THUMBS.map(createThumbRow)}
      </ScrollView>
      <View
        style={styles.button}
        onClick={() => scrollViewRef.current.scrollTo({y: 0})}>
        <Text>Scroll to top</Text>
      </View>
    </View>
  </View>;
}

let styles = {
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  sticky: {
    position: 'sticky',
    width: 750,
    top: 0,
    backgroundColor: '#cccccc',
    zIndex: 1
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
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  box: {
    width: 64,
    height: 64,
  }
};

render(<App />, document.body, { driver: DU });
