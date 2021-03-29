---
title: Baisc
order: 1
---

basic usage

```jsx

import DriverUniversal from "driver-universal";
import { createElement, render, Fragment, useEffect, useState } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Portal from "../src/index";

const basicStyle = {
  display: "block",
  height: "200rpx",
  margin: "10rpx",
};

let container1 = null;
let container2 = null;

const Demo = (props) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    container1 = document.getElementById("container-1");
    container2 = document.getElementById("container-2");
    setContainer(container1);
  }, []);

  const handleChange = () => {
    if (container === container1) {
      setContainer(container2);
    } else {
      setContainer(container1);
    }
  };

  return (
    <Fragment>
      <View style={{ ...basicStyle, backgroundColor: "#eee" }}>
        <Text>Demo content</Text>
        <Portal>
          <View>
            <Text>Body portal content</Text>
          </View>
        </Portal>
      </View>
      <View
        id="container-1"
        style={{ ...basicStyle, backgroundColor: "#FFF7F0" }}
      ></View>
      <View
        id="container-2"
        style={{ ...basicStyle, backgroundColor: "#F0F7FF" }}
      ></View>
      <Portal container={container}>
        <View>
          <Text>Portal content</Text>
          <Text onClick={handleChange}>Click me to change container</Text>
        </View>
      </Portal>
    </Fragment>
  );
};

render(<Demo />, document.body, { driver: DriverUniversal });
```
