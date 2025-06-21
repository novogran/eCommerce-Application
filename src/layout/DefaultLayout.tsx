import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import { Outlet } from "react-router";

function DefaultLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ alignSelf: "center", width: "100%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DefaultLayout;
