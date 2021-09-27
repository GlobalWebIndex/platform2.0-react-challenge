import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ children, show, onClose }) => {
  if (!show) {
    return null;
  }

  const onModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.modal__wrap} onClick={onClose}>
      <div className={styles.modal} onClick={onModalContentClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
