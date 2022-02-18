import classes from "./CatItem.module.css";

const CatItem = (props) => {
  const catSelectedHandler = (data) => {
    props.onCatSelected(data);
  };

  return (
    <li
      className={classes.item}
      onClick={() => {
        catSelectedHandler(props);
      }}
    >
      <img src={props.url} alt=""></img>
    </li>
  );
};

export default CatItem;
