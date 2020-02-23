import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import View from 'rax-view';
import Modal from '../../lib';

describe('render modal', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('should first render is visible', () => {
    let showModal = false;
    function App() {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setTimeout(() => {
          setVisible(true);
        }, 1000);
      }, []);
      return (
        <View>
          {visible ? (
            <Modal
              visible={visible}
              onHide={() => {
                setVisible(false);
              }}
              onShow={() => {
                showModal = true;
              }}
              animation={true}
              maskCanBeClick={true}
            >
              <View>这里是弹窗内容</View>
            </Modal>
          ) : null}
        </View>
      );
    }
    renderer.create(<App />).toJSON();
    expect(showModal).toBe(false);
    jest.runAllTimers();
    expect(showModal).toBe(true);
  });

  it('should render a default hidden modal', () => {
    let showModal = false;
    function App() {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        setTimeout(() => {
          setVisible(true);
        }, 1000);
      }, []);
      return (
        <View>
          <Modal
            visible={visible}
            onHide={() => {
              setVisible(false);
            }}
            onShow={() => {
              showModal = true;
            }}
            animation={true}
            maskCanBeClick={true}
          >
            <View>这里是弹窗内容</View>
          </Modal>
        </View>
      );
    }
    renderer.create(<App />).toJSON();
    expect(showModal).toBe(false);
    jest.runAllTimers();
    expect(showModal).toBe(true);
  });

  it('should render a default visible modal', () => {
    let showModal = false;
    function App() {
      const [visible, setVisible] = useState(true);
      showModal = true;
      useEffect(() => {
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      }, []);
      return (
        <View>
          <Modal
            visible={visible}
            onHide={() => {
              showModal = false;
              setVisible(false);
            }}
            animation={true}
            maskCanBeClick={true}
          >
            <View>这里是弹窗内容</View>
          </Modal>
        </View>
      );
    }
    renderer.create(<App />).toJSON();
    expect(showModal).toBe(true);
    jest.runAllTimers();
    expect(showModal).toBe(false);
  });
});
