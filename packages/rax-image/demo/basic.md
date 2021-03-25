---
title: Baisc
order: 1
---

basic usage

```jsx
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, useRef, Fragment } from 'rax';
import Image from '../src/index';
import './index.css';

const App = () => {
  const imageRef = useRef(null);
  return (
    <Fragment>
      <Image
        // @ts-ignore
        ref={imageRef}
        className="demo-image"
        source={{
          uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
        }}
      />
      <Image
        loading="lazy"
        // @ts-ignore
        ref={imageRef}
        className="demo-image"
        source={{
          uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
        }}
      />
    </Fragment>
  );
};

export default App;
```
