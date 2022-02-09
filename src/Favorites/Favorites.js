import React from "react";
import { useGlobalContext } from "../context";
import { Container, Grid, GridItem } from "./Favorites.styled";
import { motion } from "framer-motion";

const Favorites = () => {
  const {
    state: { favoritesList },
    handleFavoritesItemClick,
  } = useGlobalContext();

  return (
    <Container
      as={motion.div}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
    >
      {favoritesList.length === 0 && <h5>Here you can add your favorites!</h5>}
      <Grid>
        {favoritesList &&
          favoritesList.map((item, index) => {
            return (
              <GridItem
                key={index}
                onClick={() => handleFavoritesItemClick(item.id)}
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{
                  delay: 0.3 * index,
                }}
                as={motion.div}
              >
                <img src={item.url} alt="" />
              </GridItem>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Favorites;
