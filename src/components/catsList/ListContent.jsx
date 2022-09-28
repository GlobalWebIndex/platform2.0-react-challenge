import React from "react";
import PropTypes from "prop-types";
import noop from "../../util/noop";
import LoadMore from "../common/LoadMore";
import CardsWrapper from "../cards/CardsWrapper";

const ListContent = ({
  items = [],
  onLoadMoreClick = noop,
  isLoadingMore = false,
}) => {
  if (!items.length) {
    return <div>No 🐈 found. What may be going wrong?</div>;
  }

  return (
    <>
      <CardsWrapper
        cardItems={items.map((cat) => {
          return {
            id: cat.id,
            imageSrc: cat?.url,
            imageWidth: cat.width,
            imageHeight: cat.height,
            cardLink: `/cat/${cat.id}`,
          };
        })}
      />
      <LoadMore onClick={onLoadMoreClick} isLoadingMore={isLoadingMore} />
    </>
  );
};

ListContent.propTypes = {
  items: PropTypes.array,
  onLoadMoreClick: PropTypes.func,
  isLoadingMore: PropTypes.bool,
};

export default ListContent;
