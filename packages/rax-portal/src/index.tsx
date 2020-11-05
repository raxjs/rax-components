import { FunctionComponent, useEffect, useRef } from "rax";
import createPortal from "rax-create-portal";

const Portal: FunctionComponent<any> = (props) => {
  const { children } = props;
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(el.current);

    return () => {
      document.body.removeChild(el.current);
    };
  }, []);

  return createPortal(children, el.current);
};

export default Portal;
