import { ReactNode } from "react";
import { Typography, Rating } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

import { attributeStyles } from "./styles";

type Props = {
  attributeTitle: string;
  attributeValue: string | ReactNode;
};

const BreedAttribute: React.FC<Props> = ({
  attributeTitle,
  attributeValue,
}) => {
  const classes = attributeStyles();

  return (
    <Typography alignItems="center" noWrap pt={2} variant="body2">
      <span className={classes.bold}>
        {attributeTitle.replace("_", " ")}:{" "}
        {/* replace underscores with spaces to get the right titles */}
      </span>
      {typeof attributeValue === "number" ? (
        <Rating
          defaultValue={attributeValue}
          emptyIcon={<PetsIcon className={classes.emptyColor} />}
          icon={<PetsIcon fontSize="inherit" className={classes.filledColor} />}
          readOnly
        />
      ) : (
        attributeValue
      )}
    </Typography>
  );
};

export default BreedAttribute;
