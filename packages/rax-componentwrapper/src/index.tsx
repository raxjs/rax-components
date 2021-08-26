import { createElement, Fragment } from 'rax';

const MyComponent = ({ children }) => {
  return (
    <Fragment>{children}</Fragment>
  );
};

export default MyComponent;
