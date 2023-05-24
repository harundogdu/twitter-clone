import exp from "constants";
import { FC, useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  classes?: any;
}

export const Portal: FC<PortalProps> = ({ children, classes }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className={classes ? classes : null}>{children}</div>,
        ref.current
      )
    : null;
};
export default Portal;
