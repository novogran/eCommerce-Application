import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";
import CreatorCard from "./CreatorCard";

function AboutUsPage() {
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
          bio="21, from Minsk, now studying at BSUIR on the 4th year of study, specializing in game design. Planning to finish in 2025, in addition to that taking Front End courses."
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
          job="Developer. Teamlead"
          bio="29, developer from Minsk who started with Java (Android apps), switched to Kotlin, and later learned front-end (HTML/CSS/JS). He enjoys creative problem-solving in coding. Outside work, he likes gaming, fixing tech, and swimming. Aspires to grow and share his knowledge."
          doneFeatures={[
            "Validation",
            "Profile Page",
            "Basket Page",
            "Authentication",
            "Repository and Task Board Setup",
          ]}
          githubLink="https://github.com/novogran"
          photoUrl="/VitalyAvatar.jpg"
        ></CreatorCard>
        <CreatorCard
          name="Vasilev Aleksandr"
          job="Frontend developer"
          bio="23, from Yekaterinburg, graduated from UrFU in Software Engineering. Currently studying for a master's degree in Human-Computer Interaction."
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
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2} my={2}>
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

export default AboutUsPage;
