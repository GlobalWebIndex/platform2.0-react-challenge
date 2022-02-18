import { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoCatsFound from "../components/cats/NoCatsFound";
import CatList from "../components/cats/CatList";
import Modal from "../components/modal/Modal";
import classes from "./AllCats.module.css";
import { getAllCats } from "../lib/api";

// const getAllCats = (page = 1) => {
//   return fetch(
//     `${process.env.REACT_APP_CAT_API_URL_ALL_CATS}?limit=5&page=${page}&order=DESC`
//   ).then((resp) => resp.json());
// };

// export function useMyCatHook() {
//   const [status, setStatus] = useState("unstarted");
//   const [cats, setCats] = useState(null);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(10);

//   useEffect(() => {
//     getAllCats(currentPage)
//       .then((data) => {
//         setCats((currentState) => [...(currentState || []), ...data]);
//         setStatus("completed");
//       })
//       .catch((err) => setError(err));
//   }, [currentPage]);

//   // when React re-renders, it creates new references (instances), that can lead to irregular behaviour,
//   // using useCallback, helps with re-creating one instance of a function
//   const onLoadMore = useCallback(() => {
//     const nextPage = currentPage + 1;

//     setCurrentPage(nextPage);
//   }, [currentPage]);

//   return { status, cats, error, onLoadMore };
// }

const AllCats = ({ status, cats, error, onLoadMore }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState("");

  if ((status === "pending") | (status === "unstarted")) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused ">{error}</p>;
  }

  if (status === "completed" && (!cats || cats.length === 0)) {
    return <NoCatsFound />;
  }

  const setCatSelected = (catData) => {
    setModalData(catData);
    setOpenModal(true);
  };

  return (
    <div className={classes.mainContainer}>
      {openModal && <Modal modData={modalData} closeModal={setOpenModal} />}
      <CatList cats={cats} onCatSelect={setCatSelected} />
      <button onClick={onLoadMore} className={classes.loadMoreBtn}>
        Load More Cats!
      </button>
    </div>
  );
};

export default AllCats;
