import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import _ from "lodash";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CardBig from "../Card/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

interface ModalImageProps {
  showSecondModal: boolean;
  setShowSecondModal: Function;
  favouriteCatsList: string[];
  setFavouriteCatsList: Function;
  favourite: boolean;
  setFavourite: Function;
  setAddFavCat: Function;
  open: boolean;
  onClose: any;
  catImages: Array<object>;
}

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexWrap: "wrap",
};

const ModalSecondStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexWrap: "wrap",
};

const ButtonContainer = styled("div")({
  width: "100%",
  marginTop: 30,
  display: "flex",
  justifyContent: "space-between",
});

const CardStyle = {
  width: 275,
};

const ChipStyle = { maxWidth: 200 };

export default function BasicModal({
  showSecondModal,
  setShowSecondModal,
  favouriteCatsList,
  setFavouriteCatsList,
  favourite,
  setFavourite,
  setAddFavCat,
  open,
  onClose,
  catImages,
}: ModalImageProps) {
  const [childModalInfo, setChildModalInfo] = useState<any>();
  const [copied, setCopied] = useState(false);

  const copy = () => setCopied(true);

  const handleOnTooltipClose = () => setCopied(false);

  const onCatClick = (item: any) => {
    setShowSecondModal(true);
    setChildModalInfo(item);
  };

  useEffect(() => {
    _.includes(favouriteCatsList, childModalInfo?.url)
      ? setFavourite(true)
      : setFavourite(false);
  }, [setFavourite, favouriteCatsList, childModalInfo?.url]);

  const toggleFavouriteCat = () => {
    !favourite
      ? setFavouriteCatsList(_.concat(favouriteCatsList, [childModalInfo?.url]))
      : _.pull(favouriteCatsList, childModalInfo?.url);
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
          <Box sx={!showSecondModal ? ModalStyle : ModalSecondStyle}>
            {!showSecondModal ? (
              catImages &&
              catImages.map((item: any) => (
                <Card
                  sx={CardStyle}
                  key={item.id}
                  onClick={() => onCatClick(item)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Cat"
                      src={item.url}
                      width="200"
                      height="200"
                    />
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <>
                {childModalInfo && (
                  <>
                    <CardBig item={childModalInfo} />
                    <ButtonContainer>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {childModalInfo.breeds[0].name}
                      </Typography>
                      {childModalInfo.breeds[0].alt_names && (
                        <Chip
                          sx={ChipStyle}
                          label={childModalInfo.breeds[0].alt_names}
                          color="primary"
                        />
                      )}
                      {childModalInfo.breeds[0].origin && (
                        <Chip
                          label={childModalInfo.breeds[0].origin}
                          color="success"
                        />
                      )}
                    </ButtonContainer>
                    {childModalInfo.breeds[0].description && (
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {childModalInfo.breeds[0].description}
                      </Typography>
                    )}
                    <CopyToClipboard text={childModalInfo.url}>
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
                  </>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
