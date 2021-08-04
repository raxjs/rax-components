import { FunctionComponent, useEffect, useRef } from 'rax';
import createPortal from 'rax-create-portal';
import { isMiniApp, isWeb } from 'universal-env';

interface PortalProps {
  container?: any;
}

const Portal: FunctionComponent<PortalProps> = (props) => {
  const { children, container = document.body } = props;
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    // no container, skip render
    if (!container) {
      return undefined;
    }

    if (isMiniApp || isWeb) {
      container.appendChild(el.current);
    } else {
      setTimeout(() => container.appendChild(el.current));
    }

    return () => {
      container.removeChild(el.current);
    };
  }, []);

  return createPortal(children, el.current);
};

export default Portal;
