import { useEffect } from "react";
import styled from "@emotion/styled";
import { useStateAndLS } from "../hooks/useStateAndLS";
import { useAxios } from "../hooks/useAxios";
import Card from "../components/Card";
import OverlayLoader from "../components/OverlayLoader";
import { Button } from "semantic-ui-react";

const CardsContainer = styled.div`
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 15px;
  justify-content: center;
  margin: 10px auto;
`;

const ButtonContainer = styled.div`
  width: 30%;
  max-width: 280px;
  margin: 0 auto;
`;

const url = "/images/search";
const params = { limit: 10, order: "Rand", include_breeds: true };
const config = { url, params };

export default function Home() {
  const [images, setImages, clearImages] = useStateAndLS("images", []);
  const [response, error, loading, fetchData] = useAxios();

  useEffect(() => {
    if (response) setImages((prev) => [...prev, ...response]);
  }, [response, setImages]);

  useEffect(() => {
    if (!images.length > 0) {
      fetchData(config);
    }
  }, [images, fetchData]);

  return (
    <>
      {/* TODO handle error */}
      <OverlayLoader active={loading}>
        <CardsContainer>
          {images.map((img) => (
            <Card card={img} key={img.id} />
          ))}
        </CardsContainer>
        <ButtonContainer>
          <Button fluid primary onClick={() => fetchData(config)}>
            load more
          </Button>
          <Button
            fluid
            secondary
            onClick={() => {
              clearImages();
            }}
          >
            reset
          </Button>
        </ButtonContainer>
      </OverlayLoader>
    </>
  );
}
