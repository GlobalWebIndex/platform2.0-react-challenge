import React from "react";
import { AiFillStar } from "react-icons/ai";
import { SiZeromq } from "react-icons/si";

interface IStarRatingProps {
  numOfStars: number;
}

const StarRating: React.FC<IStarRatingProps> = ({ numOfStars }) => {
  if (numOfStars === 0) {
    return (
      <div>
        <SiZeromq />
      </div>
    );
  }
  return (
    <div>
      {[...Array(numOfStars)].map((_) => {
        return <AiFillStar />;
      })}
    </div>
  );
};

export default StarRating;
