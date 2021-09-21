import { useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

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
  height: 38,
  lineHeight: "32px",
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translate(-50%)",
  zIndex: "20",
  color: "white",
  border: "2px solid white",
  borderRadius: 10,
  textAlign: "center",
  fontSize: 16,
};

export default function Card({ card, name }) {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const { imgUrl, imgAlt, imgLink } = card;

  return (
    <CardContainer
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Image src={imgUrl} alt={imgAlt} />
      {active && (
        <>
          <Overlay active />
          <Link
            to={{
              pathname: imgLink,
              state: { background: location },
            }}
            style={buttonStyles}
          >
            {name || "Info"}
          </Link>
        </>
      )}
    </CardContainer>
  );
}
