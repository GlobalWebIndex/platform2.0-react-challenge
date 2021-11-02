import React, { useEffect, useRef } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { useModalStyles } from "./Modal.styles"

function Modal({ children, closeCallback }) {
  const classes = useModalStyles()
  const modalRef = useRef()
  useEffect(() => {
    disableBodyScroll(modalRef)

    return () => {
      enableBodyScroll(modalRef)
    }
  }, [])

  return (
    <div className={classes.modalWrapper} data-testid="modal">
      <div className={classes.modal}>
        <button
          type="button"
          className={classes.modalCloseBtn}
          onClick={closeCallback}
        >
          x
        </button>
        {children}
      </div>
      <div className={classes.overlay} onClick={closeCallback} />
    </div>
  )
}

export default Modal