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
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(0);
  const [loading, data, error, refetch] = useAPI(
    ENDPOINTS.GET_BREEDS({ limit, page })
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
      <DataGrid
        rows={data.map(({ id, ...rest }) => ({ id, breed_id: id, ...rest }))}
        columns={columns}
        pageSize={25}
        refetch={refetch}
      />
    </div>
  );
}
