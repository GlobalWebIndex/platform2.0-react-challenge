import { useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoCatsFound from "../components/cats/NoCatsFound";
import CatList from "../components/cats/CatList";
import Modal from "../components/modal/Modal";
import classes from "./AllCats.module.css";

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
