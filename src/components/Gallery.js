import Card from "../components/Card";
import styled from "@emotion/styled";

const CardsContainer = styled.div`
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 15px;
  justify-content: center;
  margin: 10px auto;
`;
export default function Gallery({ cards }) {
  return (
    <CardsContainer>
      {cards?.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </CardsContainer>
  );
}
