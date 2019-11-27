/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jsx createElement
 */
import { createElement, render, useRef } from 'rax';
import View from 'rax-view';
import DU from 'driver-universal';
import Text from 'rax-text';
import ScrollView from '../src/index';
import './index.css';

function Thumb() {
  return <View className="button" >
    <View className="box" />
  </View>;
}

let THUMBS = [];
for (let i = 0; i < 20; i++) THUMBS.push(i);
let createThumbRow = (val, i) => <Thumb key={i} />;

function App() {
  const horizontalScrollViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  return <View className="root">
    <View className="container" >
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
        className="button"
        onClick={() => horizontalScrollViewRef.current.scrollTo({ x: 0 })}>
        <Text>Scroll to start</Text>
      </View>
    </View>
    <View className="container" style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          console.log(e);
        }}
      >
        <View>
          <View className="sticky">
            <Text>Cannot sticky</Text>
          </View>
        </View>
        <View className="sticky">
          <Text>Sticky view must in ScrollView root</Text>
        </View>
        {THUMBS.map(createThumbRow)}
      </ScrollView>
      <View
        className="button"
        onClick={() => scrollViewRef.current.scrollTo({ y: 0 })}>
        <Text>Scroll to top</Text>
      </View>
    </View>
  </View>;
}

render(<App />, document.body, { driver: DU });
