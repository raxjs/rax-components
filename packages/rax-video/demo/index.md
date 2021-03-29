---
title: Baisc
order: 1
---

basic usage

```jsx

/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, useState } from 'rax';
import Video from '../src/index';
import View from 'rax-view';
import Text from 'rax-text';
import DU from 'driver-universal';

const App = () => {
  const [ playStatus, setPlayStatus ] = useState('play');
  return <View style={{ alignItems: 'center' }}>
    <Video style={{ width: 750, height: 400 }} playControl={playStatus} autoPlay controls={false} src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" />
    <View
      onClick={() => {
        if (playStatus === 'play') {
          setPlayStatus('pause');
        } else {
          setPlayStatus('play');
        }
      }}
      style={{
        width: 300,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      <Text>Switch PlayStatus</Text>
    </View>
  </View>;
};

render(<App />, document.body, { driver: DU });
```
