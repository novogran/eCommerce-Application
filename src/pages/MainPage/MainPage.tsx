import { Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";

function MainPage() {
  return (
    <Grid display={"flex"} gap={1}>
      MainPage
      <Link component={RouterLink} to="/login" variant="body2">
        Login Page
      </Link>
      <Link component={RouterLink} to="/registration" variant="body2">
        Registration Page
      </Link>
      <Link component={RouterLink} to="/error" variant="body2">
        Not Found Page
      </Link>
    </Grid>
  );
}

export default MainPage;
