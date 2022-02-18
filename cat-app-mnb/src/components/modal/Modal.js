import classes from "./Modal.module.css";

const Modal = (props) => {
  console.log("props from modal", props.modData);

  const catData = props.modData;

  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div>
          <div className={classes.titleCloseBtn}>
            <button onClick={() => props.closeModal(false)}>X</button>
          </div>
          <div className={classes.title}></div>

          <img
            className={classes.modalCatImg}
            src={catData.url}
            alt=""
          ></img>
          <div className={classes.wrapper}>
            <p>
              Cat URL:
              <a href={`${catData.url}`} target={"_blank"}>
                {catData.url}
              </a>
            </p>
            <div className={classes.footer}>
              <button
                onClick={() => props.closeModal(false)}
                className={classes.cancelBtn}
              >
                Cancel
              </button>
              <button>FAVORITE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
