import { DataGrid as MUIDataGrid } from "@material-ui/data-grid";
import { Button, makeStyles } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";

const useStyles = makeStyles((theme) => ({
  buttonRight: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "flex-end"
  }
}));

const Toolbar = ({ onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.buttonRight}>
      <Button color="secondary" onClick={onClick}>
        Reload
        <CachedIcon />
      </Button>
    </div>
  );
};

export default function DataGrid({
  refetch,
  rows,
  columns,
  pageSize = 5,
  ...rest
}) {
  return (
    <MUIDataGrid
      components={{ Toolbar: () => <Toolbar onClick={refetch} /> }}
      isRowSelectable={false}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      {...rest}
    />
  );
}
