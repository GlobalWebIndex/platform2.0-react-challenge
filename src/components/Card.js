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
  &:hover {
    transition: all 200ms ease;
  }
`;

const Label = styled.div`
  width: 100%;
  height: 38px;
  position: absolute;
  bottom: 0;
  zindex: 20;
  background: #000;
  color: white;
  line-height: 32px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

export default function Card({ card, name }) {
  const location = useLocation();
  const { imgUrl, imgAlt, imgLink } = card;
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={{
        pathname: imgLink,
        state: { background: location },
      }}
    >
      <CardContainer>
        {!imageError && (
          <Image
            src={imgUrl}
            alt={imgAlt}
            onError={() => setImageError(true)}
          />
        )}
        {name && <Label>{name}</Label>}
      </CardContainer>
    </Link>
  );
}
