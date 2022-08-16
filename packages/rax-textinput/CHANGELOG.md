# Changelog

## 1.4.6

- revert maxlength for compat set maxlength to empty string.

## 1.4.5

- maxlength and random-Number is invalid property in dom.

## 1.4.4

- In wechat-miniprogram, `previousValue` change into pureDataProperty `_previousValue` since it's irrelevant with rendering

## 1.4.3

- Remove unnecessary forceUpdate in alibaba miniapp
- Remove useless className in miniapp platforms

## 1.4.2

- `defaultValue` will only render at first time, in order to avoid that a controlled input can't be cleared
- Support show value when value is number 0 in non-control mode

## 1.4.1

- Keep wechat native code in older dir

## 1.4.0

- Support more miniapp platforms
- Adjust miniapp native code

## 1.3.8

- In Alibaba Miniapp runtime, TextInput will check is `type` supported or not
