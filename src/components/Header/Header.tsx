import { AppBar, Box, Button, Container, Toolbar, Tooltip } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { removeAuthToken } from "../../shared/utils/auth-token";
import {
  ExitToApp,
  LoginSharp,
  Person,
  PersonAdd,
  QuestionMark,
  ShoppingBag,
} from "@mui/icons-material";
import CartIcon from "../Icons/CartIcon";
import BurgerMenu from "./ui/BurgerMenu";

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ width: "90vw", alignSelf: "center", borderRadius: "10px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <NavLink to="/">
            <Button variant="text" color="inherit">
              eCommerce
            </Button>
          </NavLink>
          <Box
            display={{ xs: "none", sm: "flex" }}
            gap={2}
            sx={{
              "@media (max-width: 768px)": {
                display: "none",
              },
              "@media (min-width: 769px)": {
                display: "flex",
              },
            }}
          >
            <NavLink to="/about">
              {({ isActive }) => (
                <Tooltip title="About Us" placement="bottom" arrow>
                  <Button variant={isActive ? "contained" : "outlined"}>
                    <QuestionMark sx={{ fontSize: { xs: "16px", md: "24px" } }} />
                  </Button>
                </Tooltip>
              )}
            </NavLink>
            <NavLink to="/catalog">
              {({ isActive }) => (
                <Tooltip title="Catalog" placement="bottom" arrow>
                  <Button variant={isActive ? "contained" : "outlined"}>
                    <ShoppingBag sx={{ fontSize: { xs: "16px", md: "24px" } }} />
                  </Button>
                </Tooltip>
              )}
            </NavLink>
            <NavLink to="/cart">
              {({ isActive }) => (
                <Tooltip title="Cart" placement="bottom" arrow>
                  <Button variant={isActive ? "contained" : "outlined"}>
                    <Box
                      sx={{
                        width: { xs: "16px", md: "24px" },
                        height: { xs: "16px", md: "24px" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CartIcon />
                    </Box>
                  </Button>
                </Tooltip>
              )}
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/user">
                  {({ isActive }) => (
                    <Tooltip title="Profile" placement="bottom" arrow>
                      <Button variant={isActive ? "contained" : "outlined"}>
                        <Person sx={{ fontSize: { xs: "16px", md: "24px" } }} />
                      </Button>
                    </Tooltip>
                  )}
                </NavLink>
                <Tooltip title="Logout" placement="bottom" arrow>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      logout();
                      removeAuthToken();
                      navigate("/main");
                    }}
                  >
                    <ExitToApp sx={{ fontSize: { xs: "16px", md: "24px" } }} />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <NavLink to="/registration">
                  {({ isActive }) => (
                    <Tooltip title="Sign up" placement="bottom" arrow>
                      <Button
                        variant={isActive ? "contained" : "outlined"}
                        sx={{
                          fontSize: { xs: "0.5rem", md: "1rem" },
                        }}
                      >
                        <PersonAdd sx={{ fontSize: { xs: "16px", md: "24px" } }} />
                      </Button>
                    </Tooltip>
                  )}
                </NavLink>
                <NavLink to="/login">
                  {({ isActive }) => (
                    <Tooltip title="Login" placement="bottom" arrow>
                      <Button variant={isActive ? "contained" : "outlined"}>
                        <LoginSharp sx={{ fontSize: { xs: "16px", md: "24px" } }} />
                      </Button>
                    </Tooltip>
                  )}
                </NavLink>
              </>
            )}
          </Box>
          <BurgerMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
