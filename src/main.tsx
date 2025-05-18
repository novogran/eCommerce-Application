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
import ProtectedRoute from "./context/ProtectedRoute";
import { customerService } from "./api/api-client";
import { authService } from "./api/api-client";

export async function main(): Promise<void> {
  const TEST_EMAIL = "user@example.com";
  const TEST_PASSWORD = "securePassword123";

  try {
    const newCustomer = await customerService.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      firstName: "John",
      lastName: "Doe",
      addresses: [
        {
          streetName: "Main Street",
          city: "New York",
          postalCode: "10001",
          country: "US",
        },
      ],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    });
    console.log("New customer:", newCustomer);

    const customer = await customerService.login(TEST_EMAIL, TEST_PASSWORD);
    console.log("Logged in customer:", customer);

    const token = await authService.getCustomerToken(TEST_EMAIL, TEST_PASSWORD);
    console.log("Access token:", token);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
