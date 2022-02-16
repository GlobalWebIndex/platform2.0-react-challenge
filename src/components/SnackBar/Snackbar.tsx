import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  addFavCat: boolean;
  handleCloseAlert: any;
  favourite: boolean;
}

export default function SimpleSnackbar({
  addFavCat,
  handleCloseAlert,
  favourite,
}: SnackbarProps) {
  return (
    <Snackbar
      open={addFavCat}
      autoHideDuration={2000}
      onClose={handleCloseAlert}
    >
      <Alert
        onClose={handleCloseAlert}
        severity="success"
        sx={{ width: "100%" }}
      >
        {favourite
          ? "Cat added to favourites!"
          : "Cat removed from favourites!"}
      </Alert>
    </Snackbar>
  );
}
