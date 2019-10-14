/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render } from 'rax';
import DU from 'driver-universal';
import Picture from '../src/index';

const App = () => {
  return (
    <Picture
      source={{
        uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
      }}
      style={{
        width: 68,
        height: 68
      }}
    />
  );
};
render(<App />, document.body, { driver: DU });
