import React from "react";
import { Carousel, Col, Image, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchBreedList } from "../api/requests";
import Loading from "../components/Loading";
import { CacheKeys } from "../constants/constants";

const BreedList: React.FC = () => {
  const { status, data } = useQuery(CacheKeys.BreedList, () =>
    fetchBreedList()
  );
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <div>Something went wrong</div>;
  }  
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Carousel>
          {data?.map((breed, index) => {
            return (
              <Carousel.Item key={index} interval={10000}>
                <Image
                  className="d-block w-100"
                  src={breed.image?.url}
                  alt="First slide"
                  fluid
                  rounded />
                <Carousel.Caption className="carousel-override">
                  <Link to={{ pathname: `/breedDetail/${breed.id}`, state: { breed: breed } }}><h3>{breed.name}</h3></Link>
                  <p>{breed.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};

export default BreedList;
