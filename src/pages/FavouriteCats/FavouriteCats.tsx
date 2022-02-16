import React, { useState, forwardRef, FC } from "react";
import styled from "@emotion/styled";
import mq from "../../styling/mediaQueries";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface FavouriteCatProps {
  favouriteCatsList: any;
  setFavouriteCatsList: Function;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Container = styled("div")(
  {
    textAlign: "center",
  },
  mq({
    margin: ["40px 10px", "70px 50px 30px 50px"],
  })
);

const Content = styled("div")(
  {
    maxWidth: 500,
    display: "inline-table",
  },
  mq({
    margin: ["40px 10px", "70px 50px 30px 50px"],
  })
);

const CardStyle = {
  width: 275,
};

const AlertStyle = {
  display: "inline-flex",
  maxWidth: 200,
};

const FavouriteCats: FC<FavouriteCatProps> = ({
  favouriteCatsList,
  setFavouriteCatsList,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleRemoveItem = (item: string) => {
    setFavouriteCatsList(
      _.remove(favouriteCatsList, function (n) {
        return n !== item;
      })
    );
    setShowAlert(true);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  return (
    <Container data-testid="favourites-section">
      {favouriteCatsList && favouriteCatsList.length > 0 ? (
        favouriteCatsList.map((item: string, key: string) => (
          <Content key={key}>
            <Card sx={CardStyle}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Cat"
                  src={item}
                  width="200"
                  height="200"
                />
              </CardActionArea>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveItem(item)}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Content>
        ))
      ) : (
        <Alert sx={AlertStyle} severity="warning">
          You don't like cats :(
        </Alert>
      )}
      <Snackbar
        open={showAlert}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cat removed from favourites!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FavouriteCats;
