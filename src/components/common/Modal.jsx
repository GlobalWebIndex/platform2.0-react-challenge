import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Modal.style";

const Modal = ({ children, _useNavigate = useNavigate }) => {
  const classes = useStyles();
  let navigate = _useNavigate();

  const onClose = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  return createPortal(
    <div className={classes.modalContainer}>
      <div className={classes.modalContent}>
        <button
          type="button"
          className={classes.modalCloseButton}
          onClick={onClose}
          data-testid="modal-close-button"
        >
          X
        </button>
        {children}
      </div>
      <div
        data-testid="modal-overlay"
        className={classes.overlay}
        onClick={onClose}
      />
    </div>,
    document.getElementById("modal-root")
    // return createPortal(
    //   <div className={classes.modalContainer}>
    //     <div className={classes.modalCnt}>
    //       <btn
    //         type="btn"
    //         className={classes.modalCloseBtn}
    //         onClick={onCls}
    //         data-testid="modal-close-btn"
    //       >
    //         X
    //       </btn>
    //       {children}
    //     </div>
    //     <div
    //       data-testid="modal-ovl"
    //       className={classes.overlay}
    //       onClick={onClose}
    //     />
    //   </div>,
    //   document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  _useNavigate: PropTypes.func,
};

export default Modal;
