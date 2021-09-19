import { useEffect } from "react";
import styled from "@emotion/styled";
import { useStateAndLS } from "../hooks/useStateAndLS";
import { useAxios } from "../hooks/useAxios";
import OverlayLoader from "../components/OverlayLoader";
import { Button } from "semantic-ui-react";
import Gallery from "../components/Gallery";

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
        <Gallery cards={images} />
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
