import { createElement, render, useRef } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import DriverUniversal from "driver-universal"
import RecyclerView from 'rax-recyclerview';


function Thumb({val}) {
  return (
    <RecyclerView.Cell>
      <View style={styles.button}>
        <View style={styles.box}>{val}</View>
      </View>
    </RecyclerView.Cell>
  );
}
let THUMBS = [];
for (let i = 0; i < 100; i++) THUMBS.push(`box_${i}`);
let createThumbRow = (val) => <Thumb key={val} val={val} />;

function App() {
  const viewRef = useRef(null);

  return (
    <View style={styles.root}>
      <RecyclerView
        ref={viewRef}
        style={styles.container}
        itemSize={88}
        onScroll={(e) => {console.log(e.nativeEvent.contentOffset.y)}}
      >
        <RecyclerView.Header style={styles.sticky}>
          <Text>Sticky view is not header</Text>
        </RecyclerView.Header>
        <RecyclerView.Header>
          <View style={styles.sticky}>
            <Text>Sticky view must in header root</Text>
          </View>
        </RecyclerView.Header>
        {THUMBS.map(createThumbRow)}
      </RecyclerView>
      <View
        style={styles.fixButton}
        onClick={() => viewRef.current.scrollTo({ y: 0 })}
      >
        <Text>Scroll to top</Text>
      </View>
    </View>
  );
}

let styles = {
  root: {
    display: 'block'
  },
  sticky: {
    position: 'sticky',
    width: 750,
    top: 0,
    backgroundColor: '#cccccc'
  },
  container: {
    height: '100vh'
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  box: {
    width: 64,
    height: 64,
  },
  fixButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    border: 1,
    backgroundColor: '#fff'
  }
};

render(<App />, document.body, { driver: DriverUniversal });