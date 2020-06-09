export default function throttle(func: (...args: any[]) => void, wait: number) {
  let ctx: any;
  let args: any;
  let rtn: any;
  let timeoutID: number | ReturnType<typeof setTimeout>;
  let last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled() {
    ctx = this;
    args = arguments;
    var delta = new Date().getTime() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };
}
