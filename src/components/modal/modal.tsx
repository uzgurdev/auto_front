import { FC, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import { useOutsideClickHandler } from "hooks";
import { Icon } from "components";

const modalPortal = document.getElementById("portal-root") as HTMLElement;

interface ModalProps {
  children: ReactNode;
  classes?: string;
  onClose(): void;
}

const Modal: FC<ModalProps> = ({ children, classes, onClose }) => {
  const wrapper = useRef(null);

  useOutsideClickHandler(wrapper, onClose);

  return createPortal(
    <div
      className="fixed top-0 left-0 bg-[#33333340] w-full h-screen z-[9999999999] overflow-hidden flex items-center justify-center"
      // onClick={onClose}
    >
      <div
        ref={wrapper}
        className={`modal min-w-[550px] min-h-[550px] bg-bg-primary rounded-[20px] py-[32px] px-[25px] ${classes}`}
      >
        {children}
      </div>
      <div
        className="bg-bg-primary rounded-full ml-5 translate-y-[-620%]"
        onClick={onClose}
      >
        <Icon.Icon
          icon="icon-close"
          size="lg"
          className="border bg-bg-primary"
          color="var(--color-primary)"
          iconSize="15px"
        />
      </div>
    </div>,
    modalPortal
  );
};

export default Modal;
