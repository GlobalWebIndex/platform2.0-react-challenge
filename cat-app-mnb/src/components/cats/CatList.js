import { Fragment } from 'react';

import CatItem from './CatItem';
import classes from './CatList.module.css';

const CatList = (props) => {
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.cats.map((cat) => (
          <CatItem
            key={cat.id}
            id={cat.id}
            url={cat.url}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default CatList;
