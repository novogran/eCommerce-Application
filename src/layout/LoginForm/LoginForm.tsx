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

type LoginFormProps = {
  email?: string;
  password?: string;
  isEmailValid?: boolean;
  isPasswordValid?: boolean;
  onEmailChange?: () => void;
  onPasswordChange?: () => void;
  onSubmit?: () => void;
};

const LoginForm = ({
  email,
  password,
  isEmailValid,
  isPasswordValid,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => {
  const EMAIL_ERROR_MESSAGE: string = "Incorrect email";
  const PASSWORD_ERROR_MESSAGE: string = "Incorrect password";
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
              {!isEmailValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {EMAIL_ERROR_MESSAGE}
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
              {!isPasswordValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {PASSWORD_ERROR_MESSAGE}
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
