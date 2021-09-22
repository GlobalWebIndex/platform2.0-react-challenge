import { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import Context from "../context/AppContext";
import useCopyURL from "../hooks/useCopyURL";
import styled from "@emotion/styled";
import { Modal } from "semantic-ui-react";
import OverlayLoader from "./OverlayLoader";
import { FiHeart, FiCopy } from "react-icons/fi";
import { Loader } from "semantic-ui-react";
import mq from "../helpers";
import ErrorModal from "./ErrorModal";

const ModalContent = styled.div`
  display: flex;
  ${mq({
    height: ["auto", 374],
    flexDirection: ["column", "row"],
    justifyContent: ["center"],
    alignItems: ["center"],
  })}
`;

const Image = styled.img`
  object-fit: cover;
  background: black;
  ${mq({
    width: [250, 375],
    height: [250, 375],
  })}
`;

const Toolkit = styled.div`
  width: 150px;
  height: 50px;
  position: absolute;
  zindex: 20;
  bottom: 10px;
  left: 50%;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transform: translate(-50%);
`;

const BreedInfo = styled.div`
  ${mq({
    padding: [10, 25],
    width: [250, 250],
    height: [200, 375],
    overflowY: ["scroll", "hidden"],
  })}
  h1 {
    ${mq({
      fontSize: [16, 18],
      margin: "10px 0",
    })}
  }
  p {
    ${mq({
      fontSize: [12, 14],
      margin: "10px 0",
    })}
  }
`;

const Tool = styled.div`
  width: 25%;
  height: 50%;
  position: relative;
`;

const Msg = styled.div`
  position: absolute;
  top: -30px;
  left: -8px;
  background: white;
  border-radius: 10px;
  padding: 2px 5px;
`;

const modalStyles = mq({
  width: ["auto"],
  height: ["auto"],
  overflow: "hidden",
})[0];

const iconStyles = { width: "100%", height: "100%", strokeWidth: 1.5 };

export default function CatModal({ background }) {
  const { push } = useHistory();
  const { id } = useParams();
  const [copied, copy] = useCopyURL();
  const [data, error, loading, fetchData] = useAxios();
  const {
    favouritesData: {
      favourites,
      favouritesLoading,
      favouritesError,
      resetFavourites,
    },
  } = useContext(Context);
  const [favourite, favouriteError, favouriteLoading, fetchFavourite] =
    useAxios();

  const isFavourite = favourites?.some((fav) => fav.image_id === id);

  const handleFavourite = () => {
    // conditionally send POST or DELETE request
    // depending on the current status
    const favouriteId = favourites?.find((fav) => fav.image_id === id);
    const url = `/favourites/${isFavourite ? favouriteId.id : ""}`;
    const method = isFavourite ? "DELETE" : "POST";
    let config = { url, method };
    if (!isFavourite) config = { ...config, data: { image_id: data.id } };
    fetchFavourite(config);
  };

  useEffect(() => {
    // fetch image info
    if (!data) fetchData({ url: `/images/${id}` });
  }, [data, fetchData, id]);

  useEffect(() => {
    // refetch favourites if image's favourite status changes
    if (favourite?.message === "SUCCESS") {
      resetFavourites();
    }
  }, [favourite, resetFavourites]);

  return (
    <>
      {(!favouriteError || !favouritesError) && (
        <Modal
          onClose={() => push(background.pathname || "/")}
          open={!!id}
          style={modalStyles}
          content={
            <OverlayLoader active={loading}>
              <ModalContent>
                {data && (
                  <>
                    <div style={{ position: "relative" }}>
                      <Image src={data.url} alt="cat" />
                      <Toolkit>
                        <Tool>
                          {favouriteLoading || favouritesLoading ? (
                            <Loader />
                          ) : (
                            <FiHeart
                              color={isFavourite ? "red" : "white"}
                              fill={isFavourite ? "red" : "transparent"}
                              style={iconStyles}
                              onClick={() => handleFavourite()}
                            />
                          )}
                        </Tool>
                        <Tool>
                          {copied && <Msg>copied</Msg>}
                          <FiCopy
                            color="white"
                            style={iconStyles}
                            onClick={() => copy()}
                          />
                        </Tool>
                      </Toolkit>
                    </div>
                    <BreedInfo>
                      {data.breeds ? (
                        <>
                          <h1>{data.breeds[0]?.name}</h1>
                          <p>{data.breeds[0]?.description}</p>
                        </>
                      ) : (
                        <h3>Breed info not uvailable</h3>
                      )}
                    </BreedInfo>
                  </>
                )}
              </ModalContent>
            </OverlayLoader>
          }
        />
      )}
      {(favouriteError || favouritesError) && <ErrorModal active={error} />}
    </>
  );
}
