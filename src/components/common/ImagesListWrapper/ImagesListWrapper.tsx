import React from 'react';
import styles from './ImagesListWrapper.module.scss';

type Props = {
  children: React.ReactNode;
};

const ImagesListWrapper: React.FC<Props> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export default ImagesListWrapper;
