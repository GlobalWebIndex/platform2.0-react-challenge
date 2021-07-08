import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";

export default function BreedCats({ openOnParams, children }) {
  const history = useHistory();
  const params = useParams();
  const open = !!openOnParams.map((p) => params?.[p]).find((t) => t);

  const onClose = () => history.push("/");
  if (!open) return null;
  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>Looks like you found your match</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
