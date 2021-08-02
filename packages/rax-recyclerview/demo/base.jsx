import { createElement, Component, render } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import DriverUniversal from "driver-universal"
import RecyclerView from 'rax-recyclerview';

function Thumb() {
  return (
    <RecyclerView.Cell>
      <View style={styles.button}>
        <View style={styles.box} />
      </View>
    </RecyclerView.Cell>
  );
}
let THUMBS = [];
for (let i = 0; i < 20; i++) THUMBS.push(i);
let createThumbRow = (val, i) => <Thumb key={i} />;

function App() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <RecyclerView
          style={{
            height: 500
          }}
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
      </View>
    </View>
  );
}

let styles = {
  root: {
    width: 750,
    paddingTop: 20
  },
  sticky: {
    position: 'sticky',
    width: 750,
    top: 0,
    backgroundColor: '#cccccc'
  },
  container: {
    padding: 20,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    borderWidth: 1,
    marginLeft: 20,
    height: 1000,
    marginRight: 20,
    marginBottom: 10,
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
  }
};

render(<App />, document.body, { driver: DriverUniversal });