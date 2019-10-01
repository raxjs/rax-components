/* eslint-disable import/no-extraneous-dependencies */
import { createElement, useRef, useEffect, render } from 'rax';
import DU from 'driver-universal';
import View from '../src';
import './index.css';

const App = () => {
  const viewRef = useRef(null);
  useEffect(() => {
    console.log(viewRef.current);
  });
  return (
    <View
      ref={viewRef}
      className="box-1"
      onClick={() => {
        alert('container was clicked!');
      }}
    >
      <View
        className="box-2"
        onClick={e => {
          e.stopPropagation();
          alert('red was clicked');
        }}
      />
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: 'green',
          position: 'absolute',
          top: 20,
          left: 20
        }}
        onClick={() => {
          alert('green was clicked');
        }}
      />
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: 'yellow',
          position: 'absolute',
          top: 80,
          left: 210
        }}
      />
    </View>
  );
};

render(<App />, document.body, { driver: DU });
