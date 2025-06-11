import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";

function AboutUs() {
  return (
    <Container>
      <Typography variant="h3" textAlign={"center"} my={2}>
        About Us
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={2}>
        <CreatorCard
          name="Vladislav Semenenko"
          job="Student"
          bio="Currently studying to become a FrontEnd Developer. 4 course"
          doneFeatures={[
            "Catalog Page",
            "Login Page Layout",
            "Registration Page Layout",
            "About Us Page",
            "404 Page",
          ]}
          githubLink="https://github.com/z1ll1ax"
          photoUrl="/404.jpg"
        ></CreatorCard>
        <CreatorCard
          name="Vladislav Semenenko"
          job="Student"
          bio="Currently studying to become a FrontEnd Developer. 4 course"
          doneFeatures={[
            "Catalog Page",
            "Login Page Layout",
            "Registration Page Layout",
            "About Us Page",
            "404 Page",
          ]}
          githubLink="https://github.com/z1ll1ax"
          photoUrl="/404.jpg"
        ></CreatorCard>
        <CreatorCard
          name="Vladislav Semenenko"
          job="Student"
          bio="Currently studying to become a FrontEnd Developer. 4 course"
          doneFeatures={[
            "Catalog Page",
            "Login Page Layout",
            "Registration Page Layout",
            "About Us Page",
            "404 Page",
          ]}
          githubLink="https://github.com/z1ll1ax"
          photoUrl="/404.jpg"
        ></CreatorCard>
      </Box>
      <Link to="https://rs.school/" target="_blank">
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} mt={2}>
          <Box
            component="img"
            src="/rss-logo.svg"
            alt={"RSSchool Logo"}
            sx={{
              maxWidth: "50px",
            }}
          />
          <Typography variant="h5">RSSchool</Typography>
        </Box>
      </Link>
    </Container>
  );
}

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
        component="img"
        src={photoUrl}
        alt={name}
        mb={2}
        sx={{
          width: { xs: "90%", sm: "100%" },
          maxWidth: "250px",
          borderRadius: "50%",
          border: "2px black solid",
        }}
      />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="h6" mb={2}>
        {job}
      </Typography>
      <Typography textAlign={"center"} mb={2}>
        {bio}
      </Typography>
      {doneFeatures.map((feat, index) => {
        return <Typography key={index}>{feat}</Typography>;
      })}
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

export default AboutUs;
