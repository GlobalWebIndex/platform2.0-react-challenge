import { useState } from "react";
import styled from "@emotion/styled";
import { FiHeart } from "react-icons/fi";
import { Button } from "semantic-ui-react";

const CardContainer = styled.div`
  height: 250px;
  width: 250px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
  border-radius: 10px;
  background: black;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: ${(props) => `rgba(0, 0, 0, ${props.active ? 0.4 : 0})`};
`;

const buttonStyles = {
  width: "90%",
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translate(-50%)",
  zIndex: "20",
};

export default function Card({ card, favourite }) {
  const [active, setActive] = useState(false);

  return (
    <CardContainer
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Image src={card.url} alt={card.breeds[0]?.alt_names} />
      {active && (
        <>
          <Overlay active onClick={() => console.log(card)} />
          {favourite && (
            <FiHeart
              color="red"
              style={{
                width: 25,
                height: 25,
                position: "absolute",
                zIndex: 20,
                top: 10,
                right: 10,
              }}
            />
          )}
          <Button
            inverted
            onClick={() => console.log("info")}
            style={buttonStyles}
          >
            Info
          </Button>
        </>
      )}
    </CardContainer>
  );
}
