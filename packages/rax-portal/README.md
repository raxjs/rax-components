# rax-portal

[![npm](https://img.shields.io/npm/v/rax-portal.svg)](https://www.npmjs.com/package/rax-portal)

## 支持

Web / 阿里小程序 / 微信小程序

- 小程序仅支持 [Rax 运行时](https://rax.js.org/docs/guide/about-miniapp)

## 描述

`rax-portal` 提供了“传送”能力，可以将任意 RaxNode 渲染至根节点（body）

## 安装

```bash
$ npm install rax-portal --save
```

## 属性

| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| container | HTMLElement | document.body | false | 将内容渲染至此节点 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |

## 示例

```jsx
import { createElement, render, Fragment } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Portal from "rax-portal";

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
      <Portal container={document.body}>
        <View>
          <Text>Portal with custom container content</Text>
        </View>
      </Portal>
    </Fragment>
  );
};

render(<Demo />);
```
