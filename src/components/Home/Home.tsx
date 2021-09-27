import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCats } from "redux/images/actions";
import {
  allImagesSelector,
  imagesLoadingSelector,
} from "redux/images/selectors";
import ImagesList from "./ImagesList/ImagesList";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const images = useSelector(allImagesSelector);
  const imagesLoading = useSelector(imagesLoadingSelector);

  useEffect(() => {
    dispatch(getCats());
  }, [dispatch]);

  const onLoadMore = () => {
    if (!imagesLoading) {
      dispatch(getCats());
    }
  };

  return (
    <div className={styles.content}>
      <ImagesList images={images} />
      <button onClick={onLoadMore}>
        {imagesLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default Home;
