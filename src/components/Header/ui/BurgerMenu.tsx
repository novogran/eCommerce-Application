import {
  QuestionMark,
  ShoppingBag,
  Person,
  ExitToApp,
  PersonAdd,
  LoginSharp,
  MenuOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router";
import CartIcon from "../../Icons/CartIcon";
import { useState } from "react";
import { removeAuthToken } from "../../../shared/utils/auth-token";
import { useAuth } from "../../../hooks/useAuth";

function BurgerMenu() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = () => {
    logout();
    removeAuthToken();
    navigate("/main");
    handleMenuClose();
  };

  const getMenuItemStyles = (path: string) => {
    const isActive = location.pathname === path;
    return {
      backgroundColor: isActive ? "primary.main" : "transparent",
      color: isActive ? "primary.contrastText" : "primary.main",
      borderRadius: 1,
      margin: "2px 8px",
    };
  };

  return (
    <Box
      display={{ xs: "flex", sm: "none" }}
      sx={{
        "@media (min-width: 769px)": {
          display: "none",
        },
        "@media (max-width: 768px)": {
          display: "flex",
        },
      }}
    >
      <IconButton onClick={handleMenuOpen} color="primary">
        <MenuOutlined />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose} sx={getMenuItemStyles("/about")}>
          <NavLink to="/about" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <QuestionMark sx={{ fontSize: "16px" }} />
              About Us
            </Box>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={getMenuItemStyles("/catalog")}>
          <NavLink
            to="/catalog"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <ShoppingBag sx={{ fontSize: "16px" }} />
              Catalog
            </Box>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={getMenuItemStyles("/cart")}>
          <NavLink to="/cart" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CartIcon />
              </Box>
              Cart
            </Box>
          </NavLink>
        </MenuItem>
        {isLoggedIn ? (
          <>
            <MenuItem onClick={handleMenuClose} sx={getMenuItemStyles("/user")}>
              <NavLink
                to="/user"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Person sx={{ fontSize: "16px" }} />
                  Profile
                </Box>
              </NavLink>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                backgroundColor: "transparent",
                color: "primary.main",
                borderRadius: 1,
                margin: "2px 8px",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <ExitToApp sx={{ fontSize: "16px" }} />
                Logout
              </Box>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleMenuClose} sx={getMenuItemStyles("/registration")}>
              <NavLink
                to="/registration"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonAdd sx={{ fontSize: "16px" }} />
                  Sign up
                </Box>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={getMenuItemStyles("/login")}>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <LoginSharp sx={{ fontSize: "16px" }} />
                  Login
                </Box>
              </NavLink>
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}

export default BurgerMenu;
