---
title: Baisc
order: 1
---

basic usage

```jsx
import { createElement, render, Component } from 'rax';
import DU from 'driver-universal';
import View from 'rax-view';
import BarCode from 'rax-barcode';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <BarCode
        data={'123123123123'}
        type='CODE39'
        options={{
          fillColor: 'green'
        }}
      />
    );
  }
}

// render(<App />, document.body, { driver: DU });
export default App;
```
