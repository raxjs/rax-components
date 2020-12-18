import DriverUniversal from "driver-universal";
import { createElement, render, Fragment } from "rax";
import View from "rax-view";
import Text from "rax-text";
import Portal from "../src/index";

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

render(<Demo />, document.body, { driver: DriverUniversal });
