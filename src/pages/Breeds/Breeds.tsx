import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import mq from "../../styling/mediaQueries";
import Table from "../../components/Table/Table";
import ModalImageList from "../../components/ModalImageList/ModalImageList";
import Loader from "../../components/Loader/Loader";
import Snackbar from "../../components/SnackBar/Snackbar";

import { fetchData } from "../../config/api";
import { IMAGES_URL_PATH, BREEDS_URL_PATH } from "../../config/constants";

interface BreedProps {
  favouriteCatsList: string[];
  setFavouriteCatsList: Function;
}

const Content = styled("div")(
  {
    textAlign: "center",
  },
  mq({
    margin: ["40px 10px", "40px 20px 30px 20px"],
  })
);

const Breeds: React.FC<BreedProps> = ({
  favouriteCatsList,
  setFavouriteCatsList,
}) => {
  const [breedsData, setBreedsData] = useState();
  const [catImages, setCatImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [addFavCat, setAddFavCat] = useState(false);

  const fetchBreedsData = async () => {
    try {
      setLoading(true);
      const result = await fetchData(BREEDS_URL_PATH, {
        params: {
          size: "full",
        },
      });
      setLoading(false);
      const resultSet = result.data;
      resultSet && setBreedsData(resultSet);
    } catch (error) {
      console.error("fetchBreedsData", error);
    }
  };

  useEffect(() => {
    fetchBreedsData();
  }, []);

  const fetchCatImages = async (id: string) => {
    try {
      setLoading(true);
      const result = await fetchData(IMAGES_URL_PATH, {
        params: {
          breed_id: id,
          size: "full",
          limit: 10,
        },
      });
      setLoading(false);
      const resultSet = result.data;
      resultSet && setCatImages(resultSet);
    } catch (error) {
      console.error("fetchCatImages", error);
    }
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setCatImages([]);
    setShowSecondModal(false);
    setModalOpen(false);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAddFavCat(false);
  };

  return (
    <Content data-testid="breeds-section">
      {breedsData ? (
        <>
          <Table
            breedsData={breedsData}
            fetchCatImages={fetchCatImages}
            handleOpen={handleOpen}
          />

          {catImages && (
            <ModalImageList
              open={modalOpen}
              onClose={handleClose}
              catImages={catImages}
              showSecondModal={showSecondModal}
              setShowSecondModal={setShowSecondModal}
              setAddFavCat={setAddFavCat}
              favourite={favourite}
              setFavourite={setFavourite}
              favouriteCatsList={favouriteCatsList}
              setFavouriteCatsList={setFavouriteCatsList}
            />
          )}
          <Snackbar
            addFavCat={addFavCat}
            handleCloseAlert={handleCloseAlert}
            favourite={favourite}
          />
        </>
      ) : (
        <Loader open={loading} />
      )}
    </Content>
  );
};

export default Breeds;
