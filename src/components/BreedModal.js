import { useEffect } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import styled from "@emotion/styled";
import { Modal } from "semantic-ui-react";
import OverlayLoader from "./OverlayLoader";
import mq from "../helpers";
import ErrorModal from "./ErrorModal";

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  ${mq({
    height: ["auto", 500],
    padding: [10, 10, 0],
    flexDirection: ["column", "row"],
    justifyContent: ["flex-start", "center"],
    alignItems: ["center"],
  })}
`;

const ImageGrid = styled.div`
  width: 100%;
  max-width: 520px;
  display: grid;
  grid-gap: 10px;
  justify-content: center;
  overflow-y: scroll;
  ${mq({
    gridTemplateColumns: [
      "repeat(auto-fill, 110px)",
      "repeat(auto-fill, 150px)",
    ],
    gridTemplateRows: [110, 150],
    height: [220, 450],
  })}
`;

const Image = styled.img`
  object-fit: cover;
  background: black;
  ${mq({
    width: [110, 150],
    height: [110, 150],
  })}
`;

const BreedInfo = styled.div`
  ${mq({
    padding: [10, 25],
    margin: [10],
    width: ["100%", "100%", 250],
    height: [200, 500],
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

const modalStyles = mq({
  width: ["90%"],
  maxWidth: 800,
  height: ["auto"],
  overflow: "hidden",
  padding: [0, "0 10px"],
})[0];

export default function BreedModal({ background }) {
  const { push } = useHistory();
  const { name } = useParams();
  const location = useLocation();

  const [breed, error, loading, fetchBreed] = useAxios();
  const [images, imagesError, imagesLoading, fetchImages] = useAxios();

  useEffect(() => {
    if (!breed) fetchBreed({ url: `/breeds/search?q=${name}` });
  }, [breed, fetchBreed, name]);

  useEffect(() => {
    if (!images && breed)
      fetchImages({ url: `/images/search?breed_ids=${breed[0].id}&limit=18` });
  }, [breed, fetchImages, images]);

  return (
    <>
      {(!error || !imagesError) && (
        <Modal
          onClose={() => push(background.pathname)}
          open={!!name}
          style={modalStyles}
          content={
            <OverlayLoader active={loading || imagesLoading}>
              <ModalContent>
                {breed && (
                  <>
                    <ImageGrid>
                      {images?.map((img) => (
                        <div style={{ position: "relative", maxHeight: 150 }}>
                          <Link
                            to={{
                              pathname: `/images/${img.id}`,
                              state: { background: location },
                            }}
                          >
                            <Image src={img.url} alt={img.id} />
                            {img.name}
                          </Link>
                        </div>
                      ))}
                    </ImageGrid>
                    <BreedInfo>
                      <h1>{breed[0].name}</h1>
                      <p>{breed[0].description}</p>
                      <p>
                        <b>Origin:</b> {breed[0].origin}
                      </p>
                      <p>
                        <b>Temperament:</b> {breed[0].temperament}
                      </p>
                    </BreedInfo>
                  </>
                )}
              </ModalContent>
            </OverlayLoader>
          }
        />
      )}
      {error || (imagesError && <ErrorModal active={error} />)}
    </>
  );
}
