import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import styled from "@emotion/styled";
import { Modal } from "semantic-ui-react";
import OverlayLoader from "./OverlayLoader";

const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  background: black;
`;

const BreedInfo = styled.div`
  width: 425px;
  padding: 5px 25px;
`;

const modalStyles = { width: "auto", height: "auto" };

export default function BreedModal() {
  const { push } = useHistory();
  const { name } = useParams();
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
    <Modal
      onClose={() => push("/breeds")}
      open={!!name}
      styles={modalStyles}
      content={
        <OverlayLoader active={loading || imagesLoading}>
          <div style={{ display: "flex", height: 500 }}>
            {breed && (
              <>
                <div
                  style={{
                    maxWidth: 700,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 150px)",
                    gridGap: 15,
                    justifyContent: "center",
                    margin: 10,
                    overflowY: "scroll",
                  }}
                >
                  {images?.map((img) => (
                    <Image src={img.url} alt={img.id} />
                  ))}
                </div>
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
          </div>
        </OverlayLoader>
      }
    />
  );
}
