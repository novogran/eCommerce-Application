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
import ProtectedRoute from "./shared/utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from "./layout/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/registration",
        element: (
          <ProtectedRoute>
            <RegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
