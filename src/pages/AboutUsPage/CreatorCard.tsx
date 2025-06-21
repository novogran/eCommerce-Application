import { Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router";

type CreatorCardProps = {
  name: string;
  job: string;
  bio: string;
  doneFeatures: string[];
  githubLink: string;
  photoUrl: string;
};

function CreatorCard({ name, job, bio, doneFeatures, githubLink, photoUrl }: CreatorCardProps) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      borderRadius={2}
      boxShadow={3}
      maxWidth={"32%"}
      minWidth={"20rem"}
      justifyContent={"baseline"}
      alignItems={"center"}
      position={"relative"}
      p={1}
      bgcolor={"White"}
    >
      <Box
        mb={2}
        sx={{
          width: { xs: "150px", md: "180px" },
          height: { xs: "150px", md: "180px" },
          borderRadius: "50%",
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          border: "2px black solid",
        }}
      >
        <Box
          component="img"
          src={photoUrl}
          alt={name}
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {name}
      </Typography>
      <Typography variant="h5" mb={2}>
        {job}
      </Typography>
      <Divider orientation="horizontal" sx={{ width: "100%" }}></Divider>
      <Typography textAlign={"center"} m={1} height={"12rem"}>
        {bio}
      </Typography>
      <Divider orientation="horizontal" sx={{ width: "100%" }}></Divider>
      <Typography textAlign={"center"} mb={2} variant="h6">
        Worked on:
      </Typography>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        {doneFeatures.map((feat, index) => {
          return (
            <Typography key={index} textAlign={"center"}>
              {feat}
            </Typography>
          );
        })}
      </Box>
      <Box position={"absolute"} right={"0.5rem"}>
        <Link to={githubLink} target="_blank">
          <Box
            component="img"
            src="/github.svg"
            alt="name"
            sx={{
              maxWidth: "65px",
            }}
          />
        </Link>
      </Box>
    </Box>
  );
}

export default CreatorCard;
