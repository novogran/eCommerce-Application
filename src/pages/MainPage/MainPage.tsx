import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { NavLink } from "react-router";

function MainPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid display={"flex"} justifyContent={"center"} gap={1}>
        MainPage
        <NavLink to="/login">Login Page</NavLink>
        <NavLink to="/registration">Registration Page</NavLink>
        <NavLink to="/error">Not Found Page</NavLink>
      </Grid>
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Active Promo Codes
        </Typography>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography>RSSCHOOL5 - 5% off all cart</Typography>
          <Typography>RSSCHOOL200 - Total Price of the Order is 200$</Typography>
          <Typography>RSSCHOOL40 - 40$ discount</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default MainPage;
