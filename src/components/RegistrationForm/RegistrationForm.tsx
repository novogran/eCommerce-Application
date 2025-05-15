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
import type { UserRegistration } from "../../shared/types/UserRegistration";
import type { UserRegistrationErrorText } from "../../shared/types/UserRegistrationErrorText";

type RegistrationFormProps = {
  userProps?: UserRegistration;
  errorTextProps?: UserRegistrationErrorText;
  onUserPropsChange?: () => void;
  useDefaultAddress?: boolean;
  onSubmit?: () => void;
};

function RegistrationForm({
  userProps,
  errorTextProps,
  onUserPropsChange,
  useDefaultAddress,
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
                value={userProps?.email}
                onChange={onUserPropsChange}
              />
              {!!errorTextProps?.emailErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {errorTextProps?.emailErrorText}
                </FormHelperText>
              )}
            </Grid>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" }, alignContent: "start" }}
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
                  value={userProps?.firstName}
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.firstNameErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.firstNameErrorText}
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
                    value={userProps?.dob}
                    onChange={onUserPropsChange}
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    disableHighlightToday
                  />
                </LocalizationProvider>
                {!!errorTextProps?.dobErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.dobErrorText}
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
                  value={userProps?.lastName}
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.lastNameErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.lastNameErrorText}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, alignContent: "start" }}
            >
              <Grid>
                <TextField
                  fullWidth
                  label="Country*"
                  name="country"
                  type="text"
                  variant="outlined"
                  value={userProps?.country}
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.countryErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.countryErrorText}
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
                  value={userProps?.city}
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.cityErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.cityErrorText}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" }, alignContent: "start" }}
            >
              <Grid>
                <TextField
                  fullWidth
                  label="Street*"
                  name="street"
                  type="text"
                  variant="outlined"
                  value={userProps?.street}
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.streetErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.streetErrorText}
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
                  value={userProps?.postalCode}
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.postalCodeErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.postalCodeErrorText}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <Grid
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                alignContent: "start",
                mx: { xs: 0, sm: 2 },
              }}
            >
              <FormControlLabel
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "1 / 2" },
                  gridRow: { xs: "2 / 3", sm: "1 / 2" },
                }}
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    color="primary"
                  />
                }
                label="Show password"
              />
              <FormControlLabel
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "2 / 3" },
                  gridRow: { xs: "1 / 2", sm: "1 / 2" },
                }}
                control={
                  <Checkbox
                    checked={useDefaultAddress}
                    onChange={() => (useDefaultAddress = !useDefaultAddress)}
                    color="primary"
                  />
                }
                label="Use address as default"
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Password*"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={userProps?.password}
                onChange={onUserPropsChange}
              />
              {!!errorTextProps?.passwordErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {errorTextProps?.passwordErrorText}
                </FormHelperText>
              )}
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
