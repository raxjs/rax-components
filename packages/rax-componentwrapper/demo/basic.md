---
title: Baisc
order: 1
---

basic usage

```jsx
import { createElement, useState } from 'rax';
import ComponentWrapper from 'rax-componentwrapper';
import View from 'rax-view';

const App = () => {
  const [count, setCount] = useState(1);

  return (
    <View>
      <View onClick={() => setCount(count + 1)}>plus</View>
      <ComponentWrapper>
        <View>{count}</View>
      </ComponentWrapper>
    </View>
  );
}

export default App;
```