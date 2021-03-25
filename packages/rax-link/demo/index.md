---
title: Baisc
order: 1
---

basic usage

```jsx
import {createElement, render} from 'rax';
import DU from 'driver-universal';
import Link from '../src/index';
import Text from 'rax-text';

const App = () => (<Link href={"//www.taobao.com"} onPress={(e)=>{console.log(e)}}><Text style={{
  fontSize: 14,
  color: '#333333'
}}>click to jump</Text></Link>);

export default App;
```
