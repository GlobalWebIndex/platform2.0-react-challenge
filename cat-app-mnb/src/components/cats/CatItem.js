import classes from "./CatItem.module.css";

const CatItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.id}</p>
          <p>{props.url}</p>
        </blockquote>
      </figure>
    </li>
  );
};

export default CatItem;
