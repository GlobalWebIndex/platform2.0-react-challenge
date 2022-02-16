import React, { useState, useEffect, useCallback, FC } from "react";
import StandardImageList from "../../components/ImageList/ImageList";
import styled from "@emotion/styled";
import mq from "../../styling/mediaQueries";
import Loader from "../../components/Loader/Loader";
import Button from "@mui/material/Button";

import { fetchData } from "../../config/api";
import { IMAGES_URL_PATH } from "../../config/constants";

interface catState {
  catsData: Array<object>;
  resultSet: Object;
}

interface HomeProps {
  favouriteCatsList: string[];
  setFavouriteCatsList: Function;
}

const Content = styled("div")(
  {
    textAlign: "center",
  },
  mq({
    margin: ["40px 10px", "70px 50px 30px 50px"],
  })
);

const ButtonContainer = styled("div")(
  {
    textAlign: "center",
    marginBottom: 30,
  },
  mq({
    marginTop: [30, 30, 60],
  })
);

const Home: FC<HomeProps> = ({ favouriteCatsList, setFavouriteCatsList }) => {
  const [catsData, setCatsData] = useState<catState[]>();

  const [loading, setLoading] = useState(false);

  const fetchCatsData = useCallback(
    async (size: number) => {
      try {
        setLoading(true);
        const result = await fetchData(IMAGES_URL_PATH, {
          params: {
            limit: size,
            size: "full",
          },
        });
        setLoading(false);
        const resultSet = result.data;
        !!catsData
          ? resultSet && setCatsData([...catsData, ...resultSet])
          : resultSet && setCatsData(resultSet);
      } catch (error) {
        console.error("fetchCatsData", error);
      }
    },
    [catsData]
  );

  const onClickFetchMoreCats = async () => {
    setLoading(true);
    await fetchCatsData(10);
    setLoading(false);
  };

  useEffect(() => {
    !catsData && fetchCatsData(10);
  }, [catsData, fetchCatsData]);

  return (
    <>
      <Content data-testid="home-section">
        {catsData && (
          <StandardImageList
            catsData={catsData}
            favouriteCatsList={favouriteCatsList}
            setFavouriteCatsList={setFavouriteCatsList}
          />
        )}
      </Content>
      <ButtonContainer>
        {catsData && (
          <Button variant="contained" onClick={onClickFetchMoreCats}>
            Load more
          </Button>
        )}
      </ButtonContainer>
      <Loader open={loading} />
    </>
  );
};

export default Home;
