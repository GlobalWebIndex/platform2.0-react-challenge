import React, { useState, FC } from "react";
import styled from "@emotion/styled";
import mq from "../../styling/mediaQueries";
import Snackbar from "../../components/SnackBar/Snackbar";
import Card from "@mui/material/Card";
import Modal from "../Modal/Modal";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

interface ImageListProps {
  catsData: Array<object>;
  favouriteCatsList: string[];
  setFavouriteCatsList: Function;
}

const Content = styled("div")(
  {
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
  },
  mq({
    margin: ["20px 10px", "20px 50px 30px 50px"],
  })
);

const CardStyle = {
  width: 275,
};

const StandardImageList: FC<ImageListProps> = ({
  catsData,
  favouriteCatsList,
  setFavouriteCatsList,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCatData, setSelectedCatData] = useState();
  const [favourite, setFavourite] = useState(false);
  const [addFavCat, setAddFavCat] = useState(false);

  const handleOpen = (e: any) => {
    setSelectedCatData(e);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

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
    <Content>
      {catsData.map((item: any) => (
        <Card sx={CardStyle} key={item.id} onClick={() => handleOpen(item)}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Cat"
              src={item.url}
              width="250"
              height="250"
            />
          </CardActionArea>
        </Card>
      ))}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        selectedCatData={selectedCatData}
        favouriteCatsList={favouriteCatsList}
        setFavouriteCatsList={setFavouriteCatsList}
        setAddFavCat={setAddFavCat}
        favourite={favourite}
        setFavourite={setFavourite}
      />
      <Snackbar
        addFavCat={addFavCat}
        handleCloseAlert={handleCloseAlert}
        favourite={favourite}
      />
    </Content>
  );
};

export default StandardImageList;
