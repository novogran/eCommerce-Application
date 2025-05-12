import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";

function NotFound(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      sx={{ flexDirection: { xs: "column", lg: "row" } }}
      alignItems={"center"}
      gap={"3rem"}
    >
      <Box
        component="img"
        src="../../../public/404.jpg"
        alt="Descriptive text"
        sx={{
          width: { xs: "90%", sm: "100%" },
          height: "auto",
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
          Not found (404)
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
