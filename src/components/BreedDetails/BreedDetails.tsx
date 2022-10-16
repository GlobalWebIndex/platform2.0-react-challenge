import { Grid } from "@mui/material";

import BreedAttribute from "./BreedAttribute";
import BreedHeader from "./BreedHeader";
import { getAttributes } from "./utils";
import { Breed } from "../../types/types";

type Props = {
  breed: Breed;
};

const BreedDetails: React.FC<Props> = ({ breed }) => {
  const attributes = Object.entries(getAttributes(breed)); // Ex: ["Origin", "Egypt"]

  return (
    <>
      <BreedHeader breed={breed} />
      <Grid alignItems="center" item p={2} xs={12}>
        {attributes.map(([key, value]) => (
          <BreedAttribute
            attributeTitle={key}
            attributeValue={value}
            key={key}
          />
        ))}
      </Grid>
    </>
  );
};

export default BreedDetails;
