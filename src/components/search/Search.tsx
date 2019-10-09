import React from "react";

// Components
import { Spinner, Card, Elevation } from "@blueprintjs/core";
import { Col, Row, Container } from "react-grid-system";
import { Cat } from "../cat/Cat";
// Store
import { ICat } from "../../constants/models";
import { SearchProps } from "../../constants/props";
import { Link } from "react-router-dom";
import useGlobal, { AppState, AssociatedActions, statelessActions, initialCats } from '../../store/index';
import { useAsyncEffect } from 'use-async-effect';

const Search: React.SFC<SearchProps> = props => {
    // State
    useGlobal((state: AppState) => state.cats, (actions: AssociatedActions) => actions);
    const [imgs, setImgs] = React.useState(initialCats.data);

    useAsyncEffect(async () => {
        setImgs(initialCats.data);
        const res = await statelessActions.fetchCatsForBreed(props.breed.id);
        setImgs(res.data as ICat[]);
    }, [props.breed]);

    return (
        <>
            <Container className="container">
                <h1>Breed Images</h1>
                <Row>
                    {imgs.length > 0 && imgs.map((image: ICat) => (
                        <Col lg={2} xs={3} key={image.id} className="v-sp">
                            <Link to={"/cats/" + image.id}>
                                <Card interactive={true} elevation={Elevation.FOUR}>
                                    <Cat isModal={false} cat={image}></Cat>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                {imgs.length === 0 && <Spinner></Spinner>}
            </Container>
        </>
    );
};

export default Search;

