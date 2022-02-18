import { useEffect, useState, useCallback } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoCatsFound from "../components/cats/NoCatsFound";
import CatList from "../components/cats/CatList";
import Modal from "../components/modal/Modal";
import classes from "./AllCats.module.css";

// should call this from a seperate file and call it with some arguments
const getAllCats = (page = 1) => {
  // return fetch(
  //   `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=DESC`
  return fetch(
    `${process.env.REACT_APP_CAT_API_URL_ALL_CATS}?limit=3&page=${page}&order=DESC`
  ).then((resp) => resp.json());
};

export function useMyBeatifulHook() {
  const [status, setStatus] = useState("unstarted");
  const [cats, setCats] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(10);

  useEffect(() => {
    getAllCats(currentPage)
      .then((data) => {
        setCats((currentState) => [...(currentState || []), ...data]);
        setStatus("completed");
      })
      .catch((err) => setError(err));
  }, [currentPage]);

  // when React re-renders, it creates new references (instances), that can lead to irregular behaviour,
  // using useCallback, helps with re-creating one instance of a function
  const onLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
  }, [currentPage]);

  return { status, cats, error, onLoadMore };
}

const AllCats = ({ status, cats, error, onLoadMore }) => {
  // unstarted -> pending -> error/success
  const onCatOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

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

  // const setModalContent = (data) => {
  //   // console.log("data setmodatcontent", data);
  //   setModalData(data);
  // };

  const setCatSelected = (catData) => {
    //TODO I should pass the data to the modal so it opens with the cats
    setModalData(catData);
    console.log("cat data", catData);
    setOpenModal(true);
  };

  return (
    <div className={classes.mainContainer}>
      {openModal && <Modal modData={modalData} closeModal={setOpenModal} />}
      <CatList cats={cats} onCatSelect={setCatSelected} />
      <button onClick={onLoadMore} className={classes.openModalBtn}>
        Load More Cats!
      </button>
    </div>
  );
};

export default AllCats;
