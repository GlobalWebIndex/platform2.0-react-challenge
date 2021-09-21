import { useContext } from "react";
import styled from "@emotion/styled";
import { useFetchAndSave } from "../hooks/useFetchAndSave";
import OverlayLoader from "../components/OverlayLoader";
import { Button } from "semantic-ui-react";
import Gallery from "../components/Gallery";

const ButtonContainer = styled.div`
  width: 30%;
  max-width: 280px;
  margin: 0 auto;
`;

export default function Home() {
  const imagesData = useFetchAndSave("images", {
    url: "/images/search",
    params: { limit: 10, order: "Rand", include_breeds: true },
  });
  const [images, error, loading, fetch, clearImages] = imagesData;
  return (
    <>
      {/* TODO handle error */}
      <OverlayLoader active={loading}>
        <Gallery cards={images} />
        <ButtonContainer>
          <Button fluid primary onClick={() => fetch()}>
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
