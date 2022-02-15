import { useParams, Route } from "react-router-dom";
import { Fragment } from "react";

import HighlightedCat from "../components/cats/HighlightedCat";
// import Comments from "../components/comments/Comments";

const DUMMY_CATS = [
  { id: "q1", author: "Noel", text: "Learnig react is fun" },
  { id: "q2", author: "Maurice", text: " react is YOOOO" },
];

const CatDetail = () => {
  const params = useParams();

  const cat = DUMMY_CATS.find((cat) => cat.id === params.catId);

  if (!cat) {
    return <p>No cat found!</p>;
  }

  return (
    <Fragment>
      <HighlightedCat text={cat.text} author={cat.author} />
      <Route path={`cats/${cat.id}/comments`}>
        {/* <Comments /> */}
      </Route>
    </Fragment>
  );
};

export default CatDetail;
