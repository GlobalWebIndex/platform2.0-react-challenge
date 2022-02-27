import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import Failure from "../common/Failure";
import ListContent from "./ListContent";
import { fetchCatsList } from "../../util/api.js";
import { AsyncStatus, useAsync } from "../../hooks/useAsync";

const List = () => {
  const [page, setPage] = useState(1);
  const { data: fetchedCats, status, error, run } = useAsync();

  useEffect(() => {
    const callback = fetchCatsList(page);
    run(callback, fetchedCats);
  }, [run, page]);

  const onLoadMoreClick = () => setPage(page + 1);
  switch (status) {
    case AsyncStatus.IDLE:
    case AsyncStatus.PENDING:
      // When no cats have been requested (page = 1) just render a generic loading.
      // In other cases just render the existing list cause we've requested to load more!
      return page === 1 ? (
        <Loading />
      ) : (
        <ListContent
          items={fetchedCats}
          onLoadMoreClick={onLoadMoreClick}
          isLoadingMore={true}
        />
      );

    case AsyncStatus.REJECTED:
      return <Failure error={error} />;

    case AsyncStatus.RESOLVED:
      return (
        <ListContent
          items={fetchedCats}
          onLoadMoreClick={onLoadMoreClick}
          isLoadingMore={false}
        />
      );

    default:
      throw new Error("This shouldn't ever happen");
  }
};

export default List;
