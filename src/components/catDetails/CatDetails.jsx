import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FavouriteToggler from "./FavouriteToggler";
import Loading from "../common/Loading";
import Failure from "../common/Failure";
import { fetchCatDetails } from "../../util/api.js";
import { AsyncStatus, useAsync } from "../../hooks/useAsync";
import Card from "../cards/Card";
import CatBreeds from "./CatBreeds";

const CatDetails = () => {
  const { catId } = useParams();
  const { data: fetchedCatImg, status, error, run } = useAsync();

  useEffect(() => {
    const callback = fetchCatDetails(catId);
    run(callback);
  }, [run, catId]);

  switch (status) {
    case AsyncStatus.IDLE:
    case AsyncStatus.PENDING:
      return <Loading />;

    case AsyncStatus.REJECTED:
      return <Failure error={error} />;

    case AsyncStatus.RESOLVED:
      return (
        <Card
          imageSrc={fetchedCatImg.url}
          imageWidth={fetchedCatImg.width}
          imageHeight={fetchedCatImg.height}
          id={fetchedCatImg.id}
          title={fetchedCatImg.title}
        >
          <CatBreeds breeds={fetchedCatImg.breeds} />
          <FavouriteToggler imageId={fetchedCatImg.id} />
        </Card>
      );
    default:
      throw new Error("This shouldn't ever happen");
  }
};

CatDetails.propTypes = {};

export default CatDetails;
