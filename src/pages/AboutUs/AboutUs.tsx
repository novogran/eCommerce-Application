import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";
import CreatorCard from "./CreatorCard";

function AboutUs() {
  return (
    <Container>
      <Typography variant="h3" textAlign={"center"} my={2}>
        DreamTeam - About Us
      </Typography>
      <Typography variant="h6" textAlign={"center"} my={2}>
        Our friendly team acted cohesively, helping each other when problems arose. At meetings,
        which took place every 2 days, we discussed what we managed to realize and what caused
        problems, divided tasks, and acted according to deadlines.
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={2}>
        <CreatorCard
          name="Semenenko Vladislav"
          job="Student"
          bio="From Minsk, currently studying at BSUIR in the 4th year on Game Design."
          doneFeatures={[
            "Catalog Page",
            "Login Page Layout",
            "Registration Page Layout",
            "About Us Page",
            "404 Page",
          ]}
          githubLink="https://github.com/z1ll1ax"
          photoUrl="/VladislavAvatar.jpg"
        ></CreatorCard>
        <CreatorCard
          name="Novogran Vitaly"
          job="Student. Teamlead"
          bio="Currently studying to become a FrontEnd Developer. 4 course"
          doneFeatures={[
            "Validation",
            "Profile Page",
            "Basket Page",
            "Authentication",
            "Repository and Task Board Setup",
          ]}
          githubLink="https://github.com/novogran"
          photoUrl="/404.jpg"
        ></CreatorCard>
        <CreatorCard
          name="Vasilev Aleksandr"
          job="Frontend developer"
          bio="From Yekaterinburg, graduated from UrFU in Software Engineering. Currently studying for a master's degree in Human-Computer Interaction."
          doneFeatures={[
            "Detailed Product Page",
            "Header",
            "Routing",
            "Authentication",
            "State Management",
          ]}
          githubLink="https://github.com/c00b3r"
          photoUrl="/AleksandrAvatar.jpg"
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

export default AboutUs;
