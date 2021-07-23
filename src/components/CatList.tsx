import { Row, Button, Col } from "react-bootstrap";
import { ICatData } from "../models/models";
import CatCard from "./CatCard/CatCard";

interface ICardProps {
  cats: ICatData[];
  onFetchMore: () => void;
}

const CatList: React.FC<ICardProps> = ({ cats, onFetchMore }) => {
  return (
    <div>
      <Row>
        {cats.map((cat, index) => (
          <CatCard key={index} catData={cat} />
        ))}
      </Row>
      <Row>
        <Col className="text-center">
          <Button onClick={onFetchMore} variant="dark">
            Fetch More
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CatList;
