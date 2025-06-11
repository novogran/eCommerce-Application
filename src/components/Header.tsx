import { AppBar, Box, Button, Container, Toolbar, Tooltip } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { removeAuthToken } from "../shared/utils/auth-token";
import { ExitToApp, LoginSharp, Person, PersonAdd, ShoppingBag } from "@mui/icons-material";

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
        <Toolbar disableGutters sx={{ justifyContent: { xs: "flex-end", md: "space-between" } }}>
          <NavLink to="/">
            <Button variant="text" color="inherit">
              eCommerce
            </Button>
          </NavLink>
          <Box display="flex" gap={2}>
            <NavLink to="/catalog">
              {({ isActive }) => (
                <Tooltip title="Catalog" placement="bottom" arrow>
                  <Button variant={isActive ? "contained" : "outlined"}>
                    <ShoppingBag />
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
                        <Person />
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
                    <ExitToApp />
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
                        <PersonAdd />
                      </Button>
                    </Tooltip>
                  )}
                </NavLink>
                <NavLink to="/login">
                  {({ isActive }) => (
                    <Tooltip title="Login" placement="bottom" arrow>
                      <Button variant={isActive ? "contained" : "outlined"}>
                        <LoginSharp />
                      </Button>
                    </Tooltip>
                  )}
                </NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
