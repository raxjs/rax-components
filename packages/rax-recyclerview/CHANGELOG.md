# Changelog

## 1.4.0

- Refactor `rax-recyclerview` in web and runtime miniapp:
  - Replace `rax-view` with `rax-scrollview`;
  - Update placeholder boxes size instead of updating item style: top or left ;
- upgrade deps: `rax-scrollview` from `^3.3.3` to `^3.6.0`

## 1.3.6

- Fix RecyclerView error: "Uncaught TypeError: Cannot add property style, object is not extensible", when use virtual list mode.
- Remove `quickappConfig` in package.json

