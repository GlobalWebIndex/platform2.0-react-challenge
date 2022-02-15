import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoCatsFound from "../components/cats/NoCatsFound";
import CatList from "../components/cats/CatList";
import useHttp from "../hooks/use-http";
import { getAllCats } from '../lib/api';

// {id: '2cb', breeds: Array(0), url: 'https://cdn2.thecatapi.com/images/2cb.jpg', width: 500, height: 333}

const DUMMY_CATS = [
  {
    breeds: [],
    id: "a6u",
    url: "https://cdn2.thecatapi.com/images/a6u.jpg",
    width: 400,
    height: 300,
  },

  {
    breeds: [],
    id: "dd2",
    url: "https://cdn2.thecatapi.com/images/dd2.jpg",
    width: 740,
    height: 491,
  },
];



const AllCats = () => {
  const {
    sendRequest,
    status,
    data: loadedCats,
    error,
  } = useHttp(getAllCats, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedCats || loadedCats.length === 0)) {
    return <NoCatsFound />;
  }

  // return <CatList cats={loadedCats, console.log('loaded cats - Allcats', loadedCats[0])} />;
  return <CatList cats={DUMMY_CATS} />;
};

export default AllCats;
