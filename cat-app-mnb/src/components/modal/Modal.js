import classes from "./Modal.module.css";

const Modal = (props) => {
  const catData = props.modData;

  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div>
          <div className={classes.titleCloseBtn}>
            <button onClick={() => props.closeModal(false)}>X</button>
          </div>
          <div className={classes.centerImg}>
            <img className={classes.modalCatImg} src={catData.url} alt=""></img>
          </div>

          <div className={classes.wrapper}>
            <p>{props.modData.breeds.length > 0 ? 'Has breeds!' : ''}</p>
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
              <button>Favorite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
