import React from "react";
import { useGlobalContext } from "../context";
import Spinner from "../Spinner/Spinner";
import { Container, Grid, GridItem, Button } from "./Cats.styled";
import { motion } from "framer-motion";
import Img from "react-cool-img";
import loadingImage from "../assets/images/loading.gif";
import errorImage from "../assets/images/error.gif";

const Cats = () => {
  const {
    state: { catList, imagesAmount, isLoading, error },
    handleCatImageClick,
    handleLoadMoreClick,
  } = useGlobalContext();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return "something went wrong";
  }
  if (catList) {
    return (
      <Container
        as={motion.div}
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "-100vw" }}
      >
        <Grid>
          {catList.slice(0, imagesAmount).map((item, indx) => {
            const { url, name, id } = item;
            return (
              <GridItem
                as={motion.div}
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{
                  delay: 0.3 * indx,
                }}
                key={indx}
                onClick={() => handleCatImageClick(id)}
              >
                {name}
                <Img
                  src={url}
                  alt=""
                  placeholder={loadingImage}
                  error={errorImage}
                />
              </GridItem>
            );
          })}
        </Grid>
        <Button onClick={handleLoadMoreClick}>load more</Button>
      </Container>
    );
  }
};

export default Cats;
