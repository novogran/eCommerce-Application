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

type RegistrationFormProps = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  isEmailValid?: boolean;
  isPasswordValid?: boolean;
  isFirstNameValid?: boolean;
  isLastNameValid?: boolean;
  isDobValid?: boolean;
  isStreetValid?: boolean;
  isCityValid?: boolean;
  isPostalCodeValid?: boolean;
  isCountryValid?: boolean;
  onEmailChange?: () => void;
  onPasswordChange?: () => void;
  onFirstNameChange?: () => void;
  onLastNameChange?: () => void;
  onDobChange?: () => void;
  onStreetChange?: () => void;
  onCityChange?: () => void;
  onPostalCodeChange?: () => void;
  onCountryChange?: () => void;
  onSubmit?: () => void;
};

function RegistrationForm({
  email,
  password,
  firstName,
  lastName,
  dob,
  street,
  city,
  postalCode,
  country,
  isEmailValid,
  isPasswordValid,
  isFirstNameValid,
  isLastNameValid,
  isDobValid,
  isStreetValid,
  isCityValid,
  isPostalCodeValid,
  isCountryValid,
  onEmailChange,
  onPasswordChange,
  onFirstNameChange,
  onLastNameChange,
  onDobChange,
  onStreetChange,
  onCityChange,
  onPostalCodeChange,
  onCountryChange,
  onSubmit,
}: RegistrationFormProps): React.ReactElement {
  const ERROR_MESSAGE: string = "Incorrect";
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
        sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, minWidth: { xs: "80vw", sm: "480px" } }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign up
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={0.5} direction="column">
            <Grid>
              <TextField
                fullWidth
                label="Email*"
                name="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={onEmailChange}
              />
              {!isEmailValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {ERROR_MESSAGE}
                </FormHelperText>
              )}
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Password*"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={onPasswordChange}
              />
              {!isPasswordValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {ERROR_MESSAGE}
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
            <Box display={"grid"} alignItems={"center"} gap={1} gridTemplateColumns={"1fr 1fr"}>
              <Grid>
                <TextField
                  fullWidth
                  label="First Name*"
                  name="firstName"
                  type="text"
                  variant="outlined"
                  value={firstName}
                  onChange={onFirstNameChange}
                />
                {!isFirstNameValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {ERROR_MESSAGE}
                  </FormHelperText>
                )}
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Last Name*"
                  name="lastName"
                  type="text"
                  variant="outlined"
                  value={lastName}
                  onChange={onLastNameChange}
                />
                {!isLastNameValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {ERROR_MESSAGE}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Grid>
              {/* <DatePicker
                  format="DD.MM.YYYY"
                  shouldReserveLeadingZeros
                /> */}
              <TextField
                fullWidth
                label="Date of Birth*"
                name="dob"
                type="date"
                variant="outlined"
                value={dob}
                onChange={onDobChange}
              />
              {!isDobValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {ERROR_MESSAGE}
                </FormHelperText>
              )}
            </Grid>
            <Box display={"grid"} alignItems={"center"} gap={1} gridTemplateColumns={"1fr 1fr"}>
              <Grid>
                <TextField
                  fullWidth
                  label="Country*"
                  name="country"
                  type="text"
                  variant="outlined"
                  value={country}
                  onChange={onCountryChange}
                />
                {!isCountryValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {ERROR_MESSAGE}
                  </FormHelperText>
                )}
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="City*"
                  name="city"
                  type="text"
                  variant="outlined"
                  value={city}
                  onChange={onCityChange}
                />
                {!isCityValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {ERROR_MESSAGE}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Box display={"grid"} alignItems={"center"} gap={1} gridTemplateColumns={"2fr 1fr"}>
              <Grid>
                <TextField
                  fullWidth
                  label="Street*"
                  name="street"
                  type="text"
                  variant="outlined"
                  value={street}
                  onChange={onStreetChange}
                />
                {!isStreetValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {ERROR_MESSAGE}
                  </FormHelperText>
                )}
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Postal Code*"
                  name="postalCode"
                  type="text"
                  variant="outlined"
                  value={postalCode}
                  onChange={onPostalCodeChange}
                />
                {!isPostalCodeValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {ERROR_MESSAGE}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
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
                Sign up
              </Button>
            </Grid>
            <Grid container>
              <Grid>
                <Link href="/login" variant="body2">
                  {"Have an account already? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default RegistrationForm;
