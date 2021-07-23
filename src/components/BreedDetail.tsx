import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ICatBreed } from "../models/models";
import Loading from "./Loading";
import StarRating from "./StarRating";
import "./BreedDetail";

const BreedDetail: React.FC = () => {
  const location: any = useLocation();
  const [breed, setBreed] = useState<ICatBreed>();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    setBreed(location.state.breed);
    setImageUrl(location.state.imageUrl);
  }, [location]);

  if (!breed) return <Loading />;
  return (
    <React.Fragment>
      <Row className="text-center">
        <Col>
          {imageUrl && <Image className="breed-image" src={imageUrl} />}
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Table className="details-table" striped hover>
            <tbody>
              <tr>
                <th>Weight:</th>
                <td>{breed.weight.metric} kg</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>{breed.name}</td>
              </tr>
              <tr>
                <th>Temperament:</th>
                <td>{breed.temperament}</td>
              </tr>
              <tr>
                <th>Origin:</th>
                <td>{breed.origin}</td>
              </tr>
              <tr>
                <th>Adaptability:</th>
                <td>
                  <StarRating numOfStars={breed.adaptability} />
                </td>
              </tr>
              <tr>
                <th>Affection level:</th>
                <td>
                  <StarRating numOfStars={breed.affection_level} />
                </td>
              </tr>
              <tr>
                <th>Child friendly:</th>
                <td>
                  <StarRating numOfStars={breed.child_friendly} />
                </td>
              </tr>
              <tr>
                <th>Dog friendly: </th>
                <td>
                  <StarRating numOfStars={breed.dog_friendly} />
                </td>
              </tr>
              <tr>
                <th>Energy level:</th>
                <td>
                  <StarRating numOfStars={breed.energy_level} />
                </td>
              </tr>
              <tr>
                <th>Grooming:</th>
                <td>
                  <StarRating numOfStars={breed.grooming} />
                </td>
              </tr>
              <tr>
                <th>Health issues:</th>
                <td>
                  <StarRating numOfStars={breed.health_issues} />
                </td>
              </tr>
              <tr>
                <th>Intelligence</th>
                <td>
                  <StarRating numOfStars={breed.intelligence} />
                </td>
              </tr>
              <tr>
                <th>Shedding level:</th>
                <td>
                  <StarRating numOfStars={breed.shedding_level} />
                </td>
              </tr>
              <tr>
                <th>Social needs: </th>
                <td>
                  <StarRating numOfStars={breed.social_needs} />
                </td>
              </tr>
              <tr>
                <th>Stranger friendly: </th>
                <td>
                  <StarRating numOfStars={breed.stranger_friendly} />
                </td>
              </tr>
              <tr>
                <th>Vocalisation: </th>
                <td>
                  <StarRating numOfStars={breed.vocalisation} />
                </td>
              </tr>
              <tr>
                <th>Experimental: </th>
                <td>
                  <StarRating numOfStars={breed.experimental} />
                </td>
              </tr>
              <tr>
                <th>Hairless: </th>
                <td>
                  <StarRating numOfStars={breed.hairless} />
                </td>
              </tr>
              <tr>
                <th>Natural:</th>
                <td>
                  <StarRating numOfStars={breed.natural} />
                </td>
              </tr>
              <tr>
                <th>Rare: </th>
                <td>
                  <StarRating numOfStars={breed.rare} />
                </td>
              </tr>
              <tr>
                <th>Rex:</th>
                <td>
                  <StarRating numOfStars={breed.rex} />
                </td>
              </tr>
              <tr>
                <th>Suppressed tail: </th>
                <td>
                  <StarRating numOfStars={breed.suppressed_tail} />
                </td>
              </tr>
              <tr>
                <th>Short legs: </th>
                <td>
                  <StarRating numOfStars={breed.short_legs} />
                </td>
              </tr>
              <tr>
                <th>Adaptability</th>
                <td>
                  <StarRating numOfStars={breed.adaptability} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreedDetail;
