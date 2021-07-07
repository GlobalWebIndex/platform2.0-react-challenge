import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { columns } from "./columns";
import { useAPI } from "../hooks/useData";
import { ENDPOINTS } from "../constants";
import Progress from "../components/Progress";
import Error from "../components/Error";
import Empty from "../components/Empty";
import DataGrid from "../components/DataGrid";

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

export default function TableView() {
  const classes = useStyles();
  const [loading, data, error, refetch] = useAPI(
    ENDPOINTS.COMPANY_ENDPOINT_GET_MANY()
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
  if (data.length === 0) return <Empty />;
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Cats for catlovers
      </Typography>
      <DataGrid rows={data} columns={columns} pageSize={5} refetch={refetch} />
    </div>
  );
}
