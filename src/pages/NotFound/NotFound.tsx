import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";

function NotFound(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      sx={{ flexDirection: { xs: "column", lg: "row" }, my: 3 }}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"3rem"}
    >
      <Box
        component="img"
        src="/404.jpg"
        alt="404 error"
        sx={{
          width: { xs: "90%", sm: "100%" },
          maxWidth: "350px",
          borderRadius: 2,
          boxShadow: 3,
        }}
      />
      <Box
        sx={{ order: { xs: "-1", lg: "1" }, flexDirection: "column" }}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Page not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ mt: 1, mx: 1, width: "90%" }}
          onClick={() => navigate("/")}
        >
          Return to main page
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;
