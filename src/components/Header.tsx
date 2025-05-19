import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { removeAuthToken } from "../shared/utils/auth-token";

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
          <Box display="flex" gap={2}>
            {isLoggedIn ? (
              <Button
                variant="outlined"
                onClick={() => {
                  logout();
                  removeAuthToken();
                  navigate("/main");
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <NavLink to="/registration">
                  {({ isActive }) => (
                    <Button variant={isActive ? "contained" : "outlined"}>Sign up</Button>
                  )}
                </NavLink>
                <NavLink to="/login">
                  {({ isActive }) => (
                    <Button variant={isActive ? "contained" : "outlined"}>Login</Button>
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
