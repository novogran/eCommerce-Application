import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainPage from "./pages/MainPage/MainPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
