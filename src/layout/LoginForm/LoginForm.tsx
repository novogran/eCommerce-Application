import { Container, TextField, Button, Grid, Typography, Box, Link } from "@mui/material";

type LoginFormProps = {
  email?: string;
  password?: string;
  onEmailChange?: () => void;
  onPasswordChange?: () => void;
  onSubmit?: () => void;
};

const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign in
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={onEmailChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={onPasswordChange}
              />
            </Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                sx={{ mt: 2 }}
              >
                Sign in
              </Button>
            </Grid>
            <Grid container>
              <Grid>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
