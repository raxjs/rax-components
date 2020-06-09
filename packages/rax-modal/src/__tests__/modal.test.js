/* eslint-disable import/no-extraneous-dependencies */
import { createElement, useState, useEffect, Fragment } from 'rax';
import { mount } from 'enzyme';
import View from 'rax-view';
import Modal from '../../lib';

describe('render modal', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should render original body style, when render one more modal', () => {
    function Parent({ showModal }) {
      const [visible, setVisible] = useState(false);
      useEffect(() => {
        if (showModal) {
          setTimeout(() => {
            setVisible(true);
          }, 1000);
        }
      }, []);
      return (
        <View>
          <Modal
            visible={visible}
            animation={false}
            onMaskClick={() => {
              setVisible(false);
            }}
          >
            <View>这里是弹窗内容</View>
          </Modal>
        </View>
      );
    }

    function App() {
      return <Fragment>
        <Parent showModal={true} />
        <Parent />
      </Fragment>;
    }
    const wrapper = mount(<App />);
    expect(document.body.style.overflow).toBe('');
    jest.runAllTimers();
    expect(document.body.style.overflow).toBe('hidden');
    wrapper.find('.rax-modal-mask').at(1).simulate('click');
    jest.runAllTimers();
    expect(document.body.style.overflow).toBe('');
  });

  it("should let modal visible, when modal's visible property initial value is true", () => {
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
    mount(<App />);
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
    mount(<App />);
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
    mount(<App />);
    expect(showModal).toBe(true);
    jest.runAllTimers();
    expect(showModal).toBe(false);
  });

  it('should close the modal, when pass the onMaskClick function to control visible', () => {
    let showModal = false;
    function App() {
      const [visible, setVisible] = useState(true);
      showModal = true;
      return (
        <View>
          <Modal
            visible={visible}
            onHide={() => {
              showModal = false;
              setVisible(false);
            }}
            animation={true}
            onMaskClick={() => {
              setVisible(false);
            }}
          >
            <View>这里是弹窗内容</View>
          </Modal>
        </View>
      );
    }
    const wrapper = mount(<App />);
    expect(showModal).toBe(true);
    wrapper.find('.rax-modal-mask').at(1).simulate('click');
    jest.runAllTimers();
    expect(showModal).toBe(false);
  });
});
