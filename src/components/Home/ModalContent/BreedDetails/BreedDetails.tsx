import React from 'react';
import styles from './BreedDetails.module.scss';

type Props = {
  name: string;
  description: string;
  onClick: () => void;
};

const BreedDetails: React.FC<Props> = ({ name, description, onClick }) => {
  return (
    <div className={styles.content}>
      <h2>{name}</h2>
      <div>{description}</div>
      <button onClick={onClick}>See Breeds</button>
    </div>
  );
};

export default BreedDetails;
