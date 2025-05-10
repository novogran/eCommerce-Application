import { createTheme } from "@mui/material";
export const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ef233c",
    },
    background: {
      default: "#edf2f4",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
