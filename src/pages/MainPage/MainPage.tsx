import { Grid, Link } from "@mui/material";
import { NavLink } from "react-router";

function MainPage() {
  return (
    <Grid display={"flex"} gap={1}>
      MainPage
      <NavLink to="/login">
        Login Page
      </NavLink>
      <NavLink to="/registration">
        Registration Page
      </NavLink>
      <NavLink to="/error">
        Not Found Page
      </NavLink>
    </Grid>
  );
}

export default MainPage;
