import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { ENDPOINTS } from "../constants";
import { useAPI } from "../hooks/useData";

import Error from "./Error";
import Empty from "./Empty";
import Progress from "./Progress";

const useStyles = makeStyles((theme) => ({
  cat: {
    width: "100%",
    maxHeight: "400px"
  },
  categoryList: {
    display: "flex"
  }
}));

export default function CatModal() {
  const params = useParams();
  const history = useHistory();
  const { id: catId } = params;
  const [loading, cat = [], error] = useAPI(
    ENDPOINTS.GET_ONE_IMAGE({
      image_id: catId
    })
  );
  const classes = useStyles();
  const onClose = () => history.push("/");
  if (!catId) return null;
  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>Looks like you found your match</DialogTitle>
      <DialogContent>
        {(loading && <Progress />) ||
          (error && <Error />) ||
          (!cat?.url && <Empty />) || (
            <>
              <img
                src={cat.url}
                alt="your selected cat"
                className={classes.cat}
              />
              <ul className={classes.categoryList}>
                {cat?.categories?.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
