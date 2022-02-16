import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import _ from "lodash";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "../Card/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Chip from "@mui/material/Chip";

interface ModalProps {
  selectedCatData: any;
  favouriteCatsList: string[];
  setFavouriteCatsList: Function;
  favourite: boolean;
  setFavourite: any;
  setAddFavCat: any;
  open: boolean;
  onClose: any;
}

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ButtonContainer = styled("div")({
  marginTop: 30,
  display: "flex",
  justifyContent: "space-between",
});

export default function BasicModal({
  selectedCatData,
  favouriteCatsList,
  setFavouriteCatsList,
  favourite,
  setFavourite,
  setAddFavCat,
  open,
  onClose,
}: ModalProps) {
  const [copied, setCopied] = useState(false);
  const catBreed = selectedCatData?.breeds[0]?.name;
  const altName = selectedCatData?.breeds[0]?.alt_names;
  const origin = selectedCatData?.breeds[0]?.origin;
  const description = selectedCatData?.breeds[0]?.description;
  const catURL = selectedCatData?.url;

  const copy = () => setCopied(true);

  const handleOnTooltipClose = () => setCopied(false);

  useEffect(() => {
    _.includes(favouriteCatsList, selectedCatData?.url)
      ? setFavourite(true)
      : setFavourite(false);
  }, [setFavourite, favouriteCatsList, selectedCatData?.url]);

  const toggleFavouriteCat = () => {
    !favourite
      ? setFavouriteCatsList(
          _.concat(favouriteCatsList, [selectedCatData?.url])
        )
      : _.pull(favouriteCatsList, selectedCatData?.url);
    setFavourite(!favourite);
    setAddFavCat(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={ModalStyle}>
            <Card item={selectedCatData} />
            {catBreed && (
              <>
                <ButtonContainer>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {catBreed}
                  </Typography>
                  {altName && (
                    <Chip
                      sx={{ maxWidth: 200 }}
                      label={altName}
                      color="primary"
                    />
                  )}
                  {origin && <Chip label={origin} color="success" />}
                </ButtonContainer>
                <Link to="/breeds">Go to breeds</Link>
              </>
            )}
            {description && (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {description}
              </Typography>
            )}
            <CopyToClipboard text={catURL}>
              <ButtonContainer>
                <Tooltip
                  open={copied}
                  title={"Copied to clipboard!"}
                  leaveDelay={1500}
                  onClose={handleOnTooltipClose}
                  placement="right"
                >
                  <ContentCopyIcon
                    fontSize="large"
                    color="action"
                    onClick={copy}
                  />
                </Tooltip>
                <Checkbox
                  checked={favourite}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  onClick={toggleFavouriteCat}
                />
              </ButtonContainer>
            </CopyToClipboard>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
