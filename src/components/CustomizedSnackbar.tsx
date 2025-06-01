import * as React from "react";
import Alert from "@mui/material/Alert";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Snackbar from "@mui/material/Snackbar";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

export const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = React.useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (message: string, severity: "success" | "error" | "warning" | "info") => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );

  return { showMessage, SnackbarComponent };
};
