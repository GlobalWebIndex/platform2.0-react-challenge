import { useParams, Route } from "react-router-dom";

const DUMMY_CATS = [
  { id: "c1", url: "https://cdn2.thecatapi.com/images/w6FeZ0g-C.jpg", breeds: [] },
  { id: "c2", url: "https://cdn2.thecatapi.com/images/6sj.jpg", breeds: [] },
];

const CatDetail = () => {
  const params = useParams();

  const cat = DUMMY_CATS.find((cat) => cat.id === params.catId);

  if (!cat) {
    return <p>No cat found!</p>;
  }

  return (
    <>
      <Route path={`cats/${cat.id}`}></Route>
    </>
  );
};

export default CatDetail;
