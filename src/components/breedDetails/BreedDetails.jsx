import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAsync, AsyncStatus } from "../../hooks/useAsync";
import { fetchImagesByBreed } from "../../util/api";
import Loading from "../common/Loading";
import Failure from "../common/Failure";
import BreedDetailsContent from "./BreedDetailsContent";

const BreedDetails = () => {
  const { breedId } = useParams();
  const { data: fetchedBreedDetails, status, error, run } = useAsync();

  useEffect(() => {
    const callback = fetchImagesByBreed(breedId);
    run(callback);
  }, [run, breedId]);

  switch (status) {
    case AsyncStatus.IDLE:
    case "pending":
      return <Loading />;

    case "rejected":
      return <Failure error={error} />;

    case AsyncStatus.RESOLVED:
      return <BreedDetailsContent data={fetchedBreedDetails} />;
    default:
      throw new Error("This shouldn't ever happen");
  }
};

export default BreedDetails;
