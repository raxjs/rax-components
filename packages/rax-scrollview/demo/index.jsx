/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jsx createElement
 */
import { createElement, render, useRef } from 'rax';
import View from 'rax-view';
import DriverUniversal from 'driver-universal';
import Text from 'rax-text';
import ScrollView from '../src/index';
import './index.css';

function Thumb({ index }) {
  return (
    <View id={'id_' + index} className="button">
      <View className="box">{index}</View>
    </View>
  );
}

const list = [];
for (let i = 0; i < 20; i++) list.push(i);
const createThumbRow = (val, i) => <Thumb index={i} key={i} />;

function App() {
  const horizontalScrollViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  return (
    <View className='root'>
      <View className='container'>
        <ScrollView
          ref={horizontalScrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            console.log(e);
          }}
        >
          {list.map(createThumbRow)}
        </ScrollView>
        <View
          className='button'
          onClick={() => horizontalScrollViewRef.current.scrollTo({ x: 0 })}
        >
          <Text>Scroll to start</Text>
        </View>
        <View
          className='button'
          onClick={() =>
            horizontalScrollViewRef.current.scrollIntoView({ id: 'id_2' })
          }
        >
          <Text>Scroll to the third item</Text>
        </View>
      </View>
      <View className='container' style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            console.log(e);
          }}
        >
          <View>
            <View className='sticky'>
              <Text>Cannot sticky</Text>
            </View>
          </View>
          <View className='sticky'>
            <Text>Sticky view must in ScrollView root</Text>
          </View>
          {list.map(createThumbRow)}
        </ScrollView>
        <View
          className='button'
          onClick={() => scrollViewRef.current.scrollTo({ y: 0 })}
        >
          <Text>Scroll to top</Text>
        </View>
      </View>
    </View>
  );
}

render(<App />, document.body, { driver: DriverUniversal });
