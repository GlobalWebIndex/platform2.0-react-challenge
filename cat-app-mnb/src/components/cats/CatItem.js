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
      <p>{props.id}</p>
      {props.breeds.length === 0 ? (
        <p>no breeds</p>
      ) : (
        <p>
          <strong>IT HAZ!</strong>
          {/* {console.log("breeds:", props.breeds)} */}
        </p>
      )}
      <img src={props.url} alt=""></img>
    </li>
  );
};

export default CatItem;
