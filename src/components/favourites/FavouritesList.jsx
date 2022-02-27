import React, { useEffect } from "react";
import Loading from "../common/Loading";
import Failure from "../common/Failure";
import CardsWrapper from "../cards/CardsWrapper";
import { fetchFavourites } from "../../util/api.js";
import { AsyncStatus, useAsync } from "../../hooks/useAsync";

const FavouritesList = () => {
  const { data: fetchedFavourites, status, error, run } = useAsync();

  useEffect(() => {
    const callback = fetchFavourites();
    run(callback);
  }, [run]);

  switch (status) {
    case AsyncStatus.IDLE:
    case AsyncStatus.PENDING:
      return <Loading />;

    case AsyncStatus.REJECTED:
      return <Failure error={error} />;

    case AsyncStatus.RESOLVED:
      if (!fetchedFavourites.length) {
        return (
          <div data-testid="empty-favourite-list">
            You can try adding some favourite 🐈 first... :)
          </div>
        );
      }

      return (
        <CardsWrapper
          cardItems={fetchedFavourites.map((favourite) => {
            return {
              id: favourite.image?.id,
              imageSrc: favourite.image?.url,
              cardLink: `/cat/${favourite.image?.id}`,
            };
          })}
        />
      );

    default:
      throw new Error("This shouldn't ever happen");
  }
};

export default FavouritesList;
