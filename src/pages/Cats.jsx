import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useAPI } from "../hooks/useData";
import { ENDPOINTS } from "../constants";
import Progress from "../components/Progress";
import Error from "../components/Error";
import Empty from "../components/Empty";
import { CompanyTemplate } from "../components/Template";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: "calc(100% - 2em)",
    padding: "1em"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Details(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, datum, error] = useAPI(
    ENDPOINTS.COMPANY_ENDPOINT_GET_ONE(id)
  );
  const [isLoading, setIsLoading] = useState(loading);

  // 700ms is about a full circle and much more satisfying if you ask me
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(loading);
    }, 700);
    return () => clearTimeout(timeout);
  }, [loading]);

  if (isLoading) return <Progress />;
  if (error) return <Error />;
  if (!datum) return <Empty />;
  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        &nbsp; Company Details
      </Typography>
      <CompanyTemplate datum={datum} />
    </div>
  );
}
