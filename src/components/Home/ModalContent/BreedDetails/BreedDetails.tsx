import React from "react";

type Props = {
  name: string;
  description: string;
};

const BreedDetails: React.FC<Props> = ({ name, description }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>{description}</div>
    </div>
  );
};

export default BreedDetails;
