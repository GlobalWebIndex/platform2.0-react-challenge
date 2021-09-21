import Card from "../components/Card";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const CardsContainer = styled.div`
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 15px;
  justify-content: center;
  margin: 10px auto;
`;
export default function Gallery({ cards }) {
  const { pathname } = useLocation();
  const selectAttributes = (card, index) => {
    let attributes;
    if (pathname === "/") {
      attributes = {
        imgUrl: card.url,
        imgAlt: card.breeds[0]?.alt_names || `cat${index + 1}`,
        imgLink: `/images/${card.id}`,
      };
    }
    if (pathname.includes("/breeds")) {
      attributes = {
        imgUrl: card.image?.url,
        imgAlt: card.alt_names || `cat${index + 1}`,
        imgLink: `/breeds/${card.name}`,
      };
    }
    if (pathname.includes("/favourites")) {
      attributes = {
        imgUrl: card.image.url,
        imgAlt: `cat${index + 1}`,
        imgLink: `/images/${card.image_id}`,
      };
    }
    return attributes;
  };

  return (
    <CardsContainer>
      {cards?.map((card, index) => (
        <Card
          card={selectAttributes(card, index)}
          name={card.name}
          key={card.id}
        />
      ))}
    </CardsContainer>
  );
}
