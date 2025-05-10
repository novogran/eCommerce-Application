import { createTheme } from "@mui/material";
export const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#023e8a",
    },
    background: {
      default: "#edf2f4",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px ${theme.palette.background.default} inset !important;
          -webkit-text-fill-color: ${theme.palette.text.primary} !important;
          caret-color: ${theme.palette.text.primary} !important;
        }
        input:-moz-autofill,
        input:-moz-autofill:hover,
        input:-moz-autofill:focus {
          box-shadow: 0 0 0 30px ${theme.palette.background.default} inset;
          -moz-text-fill-color: ${theme.palette.text.primary};
        }
      `,
    },
  },
});
