import { FunctionComponent, useEffect, useRef } from "rax";
import createPortal from "rax-create-portal";

interface PortalProps {
  container?: any;
}

const Portal: FunctionComponent<PortalProps> = (props) => {
  const { children, container = document.body } = props;
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    container.appendChild(el.current);

    return () => {
      container.removeChild(el.current);
    };
  }, []);

  return createPortal(children, el.current);
};

export default Portal;
