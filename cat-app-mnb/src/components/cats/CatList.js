import CatItem from "./CatItem";
import classes from "./CatList.module.css";

const CatList = (props) => {
  const catImageClickHandler = (catData) => {
    props.onCatSelect(catData);
  };

  return (
    <ul className={classes.list}>
      {props.cats.map((cat) => (
        <CatItem
          key={cat.id}
          id={cat.id}
          url={cat.url}
          onCatSelected={catImageClickHandler}
          breeds={cat.breeds}
        />
      ))}
    </ul>
  );
};

export default CatList;
