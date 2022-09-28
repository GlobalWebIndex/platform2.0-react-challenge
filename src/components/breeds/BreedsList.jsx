import React, { useEffect } from "react";
import { useAsync, AsyncStatus } from "../../hooks/useAsync";
import { fetchBreeds } from "../../util/api";
import Loading from "../common/Loading";
import Failure from "../common/Failure";
import BreedItems from "./BreedItems";

let BreedsList = () => {
  let { data: fetchedBreeds, status, error, run } = useAsync();

  useEffect(() => {
    let callback = fetchBreeds();
    run(callback);
  }, [run]);

  switch (status) {
    case AsyncStatus.IDLE:
    case AsyncStatus.PENDING:
      return <Loading />;

    case AsyncStatus.REJECTED:
      return <Failure error={error} />;

    case AsyncStatus.RESOLVED:
      return <BreedItems items={fetchedBreeds} />;

    default:
      throw new Error("This shouldn't ever happen");
  }
};

BreedsList.propTypes = {};

export default BreedsList;
