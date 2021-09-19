import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import styled from "@emotion/styled";
import { Modal } from "semantic-ui-react";
import OverlayLoader from "./OverlayLoader";
import { FiHeart, FiCopy } from "react-icons/fi";
import { Loader } from "semantic-ui-react";

const Image = styled.img`
  height: 500px;
  width: 500px;
  object-fit: cover;
  background: black;
`;

const Toolkit = styled.div`
  width: 150px;
  height: 50px;
  position: absolute;
  zindex: 20;
  bottom: 10px;
  left: ${(props) => `${props.position || "50%"}`};
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transform: ${(props) => `translate(${props.translate || "-50%"})`};
`;

const BreedInfo = styled.div`
  width: 500px;
  padding: 25px;
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

const modalStyles = { width: "auto", height: "auto" };

const iconStyles = { width: "100%", height: "100%", strokeWidth: 1.5 };

export default function CatModal() {
  const { push } = useHistory();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [data, error, loading, fetchData] = useAxios();
  const [favourites, favouritesError, favouritesLoading, fetchFavourites] =
    useAxios();
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

  const hanldeCopyToCLipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
  };

  useEffect(() => {
    // fetch image info
    fetchData({ url: `/images/${id}` });
  }, [fetchData, id]);

  useEffect(() => {
    // fetch all favourites
    if (!favourites) fetchFavourites({ url: `/favourites/` });
  }, [favourites, fetchFavourites, id]);

  useEffect(() => {
    // refetch favourites if image's favourite status changes
    if (favourite?.message === "SUCCESS") {
      fetchFavourites({ url: `/favourites/` });
    }
  }, [favourite, fetchFavourites]);

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 1500);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Modal
      onClose={() => push("/")}
      open={id}
      styles={modalStyles}
      content={
        <OverlayLoader active={loading}>
          <div style={{ display: "flex", height: 500 }}>
            {data && (
              <>
                <Image src={data.url} alt="cat" />
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
                <Toolkit
                  position={data.breeds && "33%"}
                  translate={data.breeds && "-33%"}
                >
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
                      onClick={() => hanldeCopyToCLipboard()}
                    />
                  </Tool>
                </Toolkit>
              </>
            )}
          </div>
        </OverlayLoader>
      }
    />
  );
}
