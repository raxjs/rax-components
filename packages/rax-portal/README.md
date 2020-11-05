# rax-portal

[![npm](https://img.shields.io/npm/v/rax-portal.svg)](https://www.npmjs.com/package/rax-portal)

## 支持
Web / 阿里小程序

1. 阿里小程序 仅支持 [Rax 运行时](https://www.yuque.com/hedgqh/de046s/lrqgn6)

## 描述

`rax-portal` 提供了“传送”能力，可以将任意 RaxNode 渲染至根节点（body）

## 安装

```bash
$ npm install rax-portal --save
```

## 示例

```jsx
import { createElement, render, Fragment } from "rax";
import View from 'rax-view';
import Text from 'rax-text';
import Portal from 'rax-portal';

const Demo = (props) => {
  return (
    <Fragment>
      <View>
        <Text>Demo content</Text>
      </View>
      <Portal>
        <View>
          <Text>Portal content</Text>
        </View>
      </Portal>
    </Fragment>
  );
};

render(<Demo />);
```
