import classes from './HighlightedCat.module.css';

const HighlightedCat = (props) => {
  return (
    <figure className={classes.cat}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedCat;
