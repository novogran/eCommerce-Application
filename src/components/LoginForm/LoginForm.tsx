import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Link,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";

export type LoginFormProps = {
  email?: string;
  password?: string;
  emailErrorText?: string | null;
  passwordErrorText?: string | null;
  onEmailChange?: () => void;
  onPasswordChange?: () => void;
  onSubmit?: () => void;
  submitError?: string | null;
};

function LoginForm({
  email,
  password,
  emailErrorText,
  passwordErrorText,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  submitError,
}: LoginFormProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);

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
        sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2, minWidth: { xs: "80vw", sm: "480px" } }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
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
              {!!emailErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {emailErrorText}
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
                onChange={onPasswordChange}
              />
              {!!passwordErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {passwordErrorText}
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
                <NavLink to="/registration">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default LoginForm;
