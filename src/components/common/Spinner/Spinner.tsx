import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.content}>
      <span>Loading...</span>
    </div>
  );
};

export default Spinner;
