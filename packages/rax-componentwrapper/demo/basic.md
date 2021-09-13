---
title: Baisc
order: 1
---

basic usage

```jsx
import { createElement, useState } from 'rax';
import ComponentWrapper from 'rax-componentwrapper';
import View from 'rax-view';
import Text from 'rax-text';

function App() {
  const [arr, setArr] = useState([1, 2, 3]);
  return (
    <View>
      <View onClick={() => setArr([2, 2, 2])}>Click</View>
      <ComponentWrapper>
      {arr.map((item, index) => <Text key={index}>{item}</Text>)}
      </ComponentWrapper>
    </View>
  );
}

export default App;
```