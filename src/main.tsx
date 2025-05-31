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
import ProtectedRoute from "./shared/utils/route/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import DefaultLayout from "./layout/DefaultLayout";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import UserRoute from "./shared/utils/route/UserRoute";
import productLoader from "./pages/ProductPage/product-loader";

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
        path: "/user",
        element: (
          <UserRoute>
            <UserProfilePage />
          </UserRoute>
        ),
      },
      {
        path: "/catalog",
        element: <CatalogPage />,
      },
      {
        path: "/product/:key",
        element: <ProductPage />,
        loader: productLoader,
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
