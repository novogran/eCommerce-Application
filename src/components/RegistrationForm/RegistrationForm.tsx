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
import { Link as RouterLink } from "react-router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

type RegistrationFormProps = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: Dayjs;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  emailErrorText?: string | null;
  passwordErrorText?: string | null;
  firstNameErrorText?: string | null;
  lastNameErrorText?: string | null;
  dobErrorText?: string | null;
  streetErrorText?: string | null;
  cityErrorText?: string | null;
  postalCodeErrorText?: string | null;
  countryErrorText?: string | null;
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
  emailErrorText,
  passwordErrorText,
  firstNameErrorText,
  lastNameErrorText,
  dobErrorText,
  streetErrorText,
  cityErrorText,
  postalCodeErrorText,
  countryErrorText,
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
          Sign up
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={1} direction="column">
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
              {!!emailErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {emailErrorText}
                </FormHelperText>
              )}
            </Grid>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" } }}
            >
              <Grid
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "1 / 2" },
                  gridRow: { xs: "1 / 2", sm: "1 / 2" },
                }}
              >
                <TextField
                  fullWidth
                  label="First Name*"
                  name="firstName"
                  type="text"
                  variant="outlined"
                  value={firstName}
                  onChange={onFirstNameChange}
                />
                {!!firstNameErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {firstNameErrorText}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "2 / 3" },
                  gridRow: { xs: "3 / 4", sm: "2 / 3" },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth*"
                    value={dob}
                    onChange={onDobChange}
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    disableHighlightToday
                  />
                </LocalizationProvider>
                {!!dobErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {dobErrorText}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "1 / 2" },
                  gridRow: { xs: "2 / 3", sm: "2 / 3" },
                }}
              >
                <TextField
                  fullWidth
                  label="Last Name*"
                  name="lastName"
                  type="text"
                  variant="outlined"
                  value={lastName}
                  onChange={onLastNameChange}
                />
                {!!lastNameErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {lastNameErrorText}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}
            >
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
                {!!countryErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {countryErrorText}
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
                {!!cityErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {cityErrorText}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" } }}
            >
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
                {!!streetErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {streetErrorText}
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
                {!!postalCodeErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {postalCodeErrorText}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
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
                <Link component={RouterLink} to="/login" variant="body2">
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
