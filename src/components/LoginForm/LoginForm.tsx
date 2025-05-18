import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";

export type LoginFormProps = {
  email: string;
  password: string;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitError?: string | null;
};

function LoginForm({
  email,
  password,
  isEmailValid,
  isPasswordValid,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  submitError,
}: LoginFormProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const EMAIL_ERROR_TEXT = "Incorrect email, must be: user@example.com";
  const PASSWORD_ERROR_TEXT =
    "Incorrect password, must be at least 8 characters long, contains at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9)";

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
      <Box
        sx={{
          my: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          minWidth: { xs: "80vw", sm: "480px" },
          width: { xs: "80vw", sm: "800px" },
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign in
        </Typography>
        <form noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2} direction="column">
            <Grid>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
              {email && !isEmailValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {EMAIL_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
              {password && !isPasswordValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {PASSWORD_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    color="primary"
                  />
                }
                label="Show password"
              />
            </Grid>
            {!!submitError && (
              <FormHelperText error sx={{ mx: 0 }}>
                {submitError}
              </FormHelperText>
            )}
            <Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                formNoValidate
                sx={{ mt: 1 }}
              >
                Sign in
              </Button>
            </Grid>
            <Grid container>
              <Grid>
                <NavLink to="/registration">{"Don't have an account? Sign Up"}</NavLink>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default LoginForm;
