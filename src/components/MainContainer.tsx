import React from "react";
import { Router, RouteComponentProps,Link, Location } from "@reach/router";
import Dialog from "@material-ui/core/Dialog";
import "../styles/app.scss";
import Grid from "../views/Catgrid/Grid";
import CatDetailsContainer from "../components/CatDetails"
import Catbreedlist from "../views/Catbreed/Catbreedlist"

const MainContainer = () => {
  interface ICatDetailsProps extends RouteComponentProps {
    catId?: string;
  }
  let IGrid = (props: ICatDetailsProps) => <Grid data={props} />
  let ICatDetails = (props: ICatDetailsProps) => <CatDetailsContainer data={props} />

  function Routes(props:any) {
    return (
      <Router {...props}>
          <IGrid path="/" />
          <ICatDetails path="/cat/:catId" />
          <IGrid path="/breeds" />
          <IGrid path="/favourites" />
        </Router>
    );
  }
  function Main() {
    return (
      <Location>
        {({ location, navigate }) => {
          const { oldLocation } = location.state || {};
          return (
            <>
              { <Routes location={oldLocation != null ? oldLocation : location} /> }
              <Dialog
              onClose={() => {
                navigate(oldLocation.pathname);
             }}
              aria-labelledby="simple-dialog-title"
              open={oldLocation != null}
              >
                <Routes location={location} />
              </Dialog>
            </>
          );
        }}
      </Location>
    );
  }
  return (
    <Main/>
  );
};

export default MainContainer;
