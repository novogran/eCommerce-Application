import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <LoginPage />
    </ThemeProvider>
  </StrictMode>
);
